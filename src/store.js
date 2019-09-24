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
    setTask(state, payload) {
      state.tasks[payload.index] = payload.task;
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
    addTask(context, task) {
      context.commit('addTask', task);
    },
    clearTask(context, task) {
      context.commit('clearTask', task);
    },
    pollTaskStatus(context, payload) {
      axios
        .get(`${settings.api}/status/${payload.task.uuid}`)
        .then((response) => {
          if (response.data.status === 'PENDING') {
            // PENDING in celery means "don't know". If the job is not expired, assume it is in the queue, otherwise
            // mark it as expired and forget about it.
            if (moment(payload.task.expiry).isBefore(moment())) {
              payload.task.status = 'EXPIRED';
            } else {
              payload.task.status = 'QUEUED';
            }
          } else if (response.data.status === 'FAILURE') {
            payload.task.status = response.data.status;
            context.dispatch('getTask', payload);
          } else {
            payload.task.status = response.data.status;
          }
          context.commit('setTask', { index: payload.index, task: payload.task });
        }).catch(() => {
          payload.task.status = 'POLL_ERROR';
          context.commit('setTask', { index: payload.index, task: payload.task });
        });
    },
    getTask(context, payload) {
      axios
        .get(`${settings.api}/report/${payload.task.uuid}`)
        .then((response) => {
          payload.task.status = response.data.status;
          if (response.data.status === 'FAILURE') {
            payload.task.failureException = response.data.exception;
            payload.task.failureMessage = response.data.message;
          }
        }).catch(() => {
          payload.task.status = 'POLL_ERROR';
        }).then(() => {
          context.commit('setTask', { index: payload.index, task: payload.task });
        });
    },
  },
});
