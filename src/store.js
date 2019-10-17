import Vue from 'vue';
import Vuex from 'vuex';
import * as axios from 'axios';
import * as moment from 'moment';
import settings from '@/settings';

Vue.use(Vuex);

// Task type:
// {
//   filename: string
//   uuid: string
//   submitted: string (moment.toJSON() datetime)
//   expiry: string (moment.toJSON() datetime)
//   status: string (QUEUED | STARTED | FAILURE | SUCCESS | EXPIRED | POLL_ERROR)
//   failureException: string | null
//   failureMessage: string | null
// }

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  mutations: {
    addTask(state, task) {
      // Check for and ignore tasks with duplicate UUIDs. This check deals with
      // an earlier bug (it's unlikely to happen now). It also fixes state for
      // any users who visited the site while the bug was active.
      // The check can be removed when all those users have visited the site,
      // but it's of course hard to say when that would be.
      if (state.tasks.find(t => t.uuid === task.uuid)) {
        return;
      }
      state.tasks.push(task);
    },
    setTask(state, task) {
      const index = state.tasks.findIndex(t => t.uuid === task.uuid);
      Vue.set(state.tasks, index, task);
    },
    clearTask(state, task) {
      state.tasks = state.tasks.filter(t => t !== task);
    },
  },
  actions: {
    readTasks(context) {
      const tasks = localStorage.getItem('tasks');
      if (tasks !== null) {
        JSON.parse(tasks).forEach((task) => {
          context.commit('addTask', task);
        });
      }
    },
    checkExpiredTasks(context) {
      // Check if any task has passed its expiry date. Celery won't give us any
      // expiry information, so check manually client-side.
      context.state.tasks
        .filter(task => task.status !== 'EXPIRED')
        .forEach((task) => {
          if (moment(task.expiry).isBefore(moment())) {
            context.commit('setTask', { ...task, status: 'EXPIRED' });
          }
        });
    },
    pollRunningTasks(context) {
      context.state.tasks
        .filter(task => !['SUCCESS', 'FAILURE', 'EXPIRED'].includes(task.status))
        .forEach((task) => {
          axios
            .get(`${settings.api}/status/${task.uuid}`)
            .then((response) => {
              if (response.data.status === 'PENDING') {
                // PENDING in celery means "don't know", assume it is in the queue.
                context.commit('setTask', { ...task, status: 'QUEUED' });
              } else if (response.data.status === 'FAILURE') {
                context.commit('setTask', { ...task, status: response.data.status });
                context.dispatch('getTask', task);
              } else {
                context.commit('setTask', { ...task, status: response.data.status });
              }
            }).catch(() => {
              context.commit('setTask', { ...task, status: 'POLL_ERROR' });
            });
        });
    },
    getTask(context, task) {
      axios
        .get(`${settings.api}/report/${task.uuid}`)
        .then((response) => {
          context.commit('setTask', { ...task, status: response.data.status });
          if (response.data.status === 'FAILURE') {
            context.commit('setTask', {
              ...task,
              failureException: response.data.exception,
              failureMessage: response.data.message,
            });
          }
        }).catch(() => {
          context.commit('setTask', { ...task, status: 'POLL_ERROR' });
        });
    },
  },
});
