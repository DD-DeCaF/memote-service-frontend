<template>
  <div id="app">
    <Header/>
    <Upload @task-created="addTask" />
    <Tasks v-bind:tasks="tasks" />
    <Welcome/>
    <Footer/>
  </div>
</template>

<script>
import * as axios from 'axios';

import Header from './components/Header.vue';
import Upload from './components/Upload.vue';
import Tasks from './components/Tasks.vue';
import Welcome from './components/Welcome.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Upload,
    Tasks,
    Welcome,
    Footer,
  },
  data: () => ({
    tasks: []
  }),
  methods: {
    readTasks() {
      if(localStorage.getItem('tasks') === null) {
        this.persistTasks();
      } else {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
      }
    },
    addTask(uuid) {
      this.tasks.push({
        uuid: uuid,
        submitted: new Date(),
        status: 'PENDING',
      });
      this.persistTasks();
    },
    persistTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    pollTasks() {
      this.tasks.forEach((task) => {
        if(task.status === 'SUCCESS' || task.status == 'FAILURE') {
          return;
        }

        axios
          .get(`http://localhost:8000/memote-webservice/status/${task.uuid}`)
          .then(response => {
            console.log(response.data);
            task.status = response.data.status;
          }).catch(error => {
            // TODO
            console.log(error);
          });
      });
      this.persistTasks();
      setTimeout(this.pollTasks, 1000);
    },
  },
  created() {
    this.readTasks();
    this.pollTasks();
  },
};
</script>

<style>
  @import './assets/materialize.min.css';
</style>
