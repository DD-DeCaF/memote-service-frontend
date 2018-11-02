<template>
  <div id="app">
    <Header/>
    <Welcome/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Welcome from './components/Welcome.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Welcome,
    Footer,
  }
};
</script>

<style>
  @import './assets/materialize.min.css';
</style>
