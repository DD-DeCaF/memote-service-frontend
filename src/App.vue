<template>
  <div id="app">
    <Header/>
    <Upload/>
    <Tasks/>
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
  created() {
    // Read existing tasks from local storage.
    this.$store.dispatch('readTasks');

    // Loop all tasks and refresh their status indefinitely.
    const pollTasksLoop = () => {
      this.$store.state.tasks.forEach((task, index) => {
        this.$store.dispatch('pollTaskStatus', {task: task, index: index});
      })
      setTimeout(pollTasksLoop, 1000);
    }
    pollTasksLoop();
  },
};
</script>

<style>
  @import './assets/materialize.min.css';
</style>
