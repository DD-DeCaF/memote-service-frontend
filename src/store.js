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
      state.tasks.push(task);
    },
    setTask(state, task) {
      const index = state.tasks.findIndex(t => t.uuid === task.uuid);
      state.tasks[index] = task;
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
    pollTaskStatus(context, task) {
      axios
        .get(`${settings.api}/status/${task.uuid}`)
        .then((response) => {
          if (response.data.status === 'PENDING') {
            // PENDING in celery means "don't know". If the job is not expired, assume it is in the queue, otherwise
            // mark it as expired and forget about it.
            if (moment(task.expiry).isBefore(moment())) {
              task.status = 'EXPIRED';
            } else {
              task.status = 'QUEUED';
            }
          } else if (response.data.status === 'FAILURE') {
            task.status = response.data.status;
            context.dispatch('getTask', task);
          } else {
            task.status = response.data.status;
          }
          context.commit('setTask', task);
        }).catch(() => {
          task.status = 'POLL_ERROR';
          context.commit('setTask', task);
        });
    },
    getTask(context, task) {
      axios
        .get(`${settings.api}/report/${task.uuid}`)
        .then((response) => {
          task.status = response.data.status;
          if (response.data.status === 'FAILURE') {
            task.failureException = response.data.exception;
            task.failureMessage = response.data.message;
          }
        }).catch(() => {
          task.status = 'POLL_ERROR';
        }).then(() => {
          context.commit('setTask', task);
        });
    },
  },
});
