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
import Header from './components/Header.vue';
import Upload from './components/Upload.vue';
import Tasks from './components/Tasks.vue';
import Welcome from './components/Welcome.vue';
import Footer from './components/Footer.vue';

export default {
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
      this.$store.state.tasks
        .filter(task => !['SUCCESS', 'FAILURE', 'EXPIRED'].includes(task.status))
        .forEach((task, index) => {
          this.$store.dispatch('pollTaskStatus', { task, index });
        });
      setTimeout(pollTasksLoop, 3000);
    };
    pollTasksLoop();

    // Store tasks when tab is closed
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('tasks', JSON.stringify(this.$store.state.tasks));
    });
  },
};
</script>

<style>
@import './assets/materialize.min.css';

.memote-blue {
  background-color: #2a7bb8;
}
.memote-blue.btn:hover {
  background-color: #A3D0E0;
}
.memote-blue-text {
  color: #2a7bb8;
}
</style>
