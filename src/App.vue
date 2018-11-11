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
    // See: https://github.com/vuejs/eslint-plugin-vue/issues/556
    // eslint-disable-next-line vue/no-unused-components
    Header,
    Upload,
    Tasks,
    Welcome,
    // See: https://github.com/vuejs/eslint-plugin-vue/issues/556
    // eslint-disable-next-line vue/no-unused-components
    Footer,
  },
  created() {
    // Read existing tasks from local storage.
    this.$store.dispatch('readTasks');

    // Loop all tasks and refresh their status indefinitely.
    const pollTasksLoop = () => {
      this.$store.state.tasks.forEach((task, index) => {
        this.$store.dispatch('pollTaskStatus', { task, index });
      });
      setTimeout(pollTasksLoop, 3000);
    };
    pollTasksLoop();
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
