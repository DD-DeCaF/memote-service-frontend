<template>
  <div id="app">
    <Header/>
    <Welcome/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Welcome from './components/Welcome.vue';

export default {
  name: 'app',
  components: {
    Header,
    Welcome,
  }
};
</script>

<style>
  @import './assets/materialize.min.css';
</style>
