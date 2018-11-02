<template>
  <div id="app">
    <Header/>
    <Upload/>
    <Welcome/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Upload from './components/Upload.vue';
import Welcome from './components/Welcome.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Upload,
    Welcome,
    Footer,
  }
};
</script>

<style>
  @import './assets/materialize.min.css';
</style>
