import Vue from 'vue';
import Vuex from 'vuex';
import * as axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setTask(state, payload) {
      state.tasks[payload.index] = payload.task;
    },
    addTask(state, uuid) {
      state.tasks.push({
        uuid: uuid,
        submitted: new Date(),
        status: 'PENDING',
      });
    },
  },
  actions: {
    readTasks(context) {
      const tasks = localStorage.getItem('tasks');
      if (tasks !== null) {
        context.commit('setTasks', JSON.parse(tasks));
      }
    },
    storeTasks(context) {
      localStorage.setItem('tasks', JSON.stringify(context.state.tasks));
    },
    addTask(context, uuid) {
      context.commit('addTask', uuid);
      context.dispatch('storeTasks');
    },
    pollTaskStatus(context, payload) {
      if (payload.task.status === 'SUCCESS' || payload.task.status == 'FAILURE') {
        return;
      }

      axios
        .get(`http://localhost:8000/memote-webservice/status/${payload.task.uuid}`)
        .then(response => {
          payload.task.status = response.data.status;
        }).catch(error => {
          // TODO
          console.error(error);
        }).then(() => {
          context.commit('setTask', { index: payload.index, task: payload.task });
          context.dispatch('storeTasks');
        });
    },
  },
});
