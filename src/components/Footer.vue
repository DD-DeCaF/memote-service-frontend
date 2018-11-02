<template>
  <footer class="container">
    <p class="center-align">The initial development of memote has received funding from:</p>
    <div class="row">
      <div class="col s2 center-align">
        <a href="http://novonordiskfonden.dk/en" target="_blank">
          <img src="../assets/images/novo_nordisk.png" class="icon nordisk" />
        </a>
      </div>
      <div class="col s2 offset-s1 center-align">
        <a href="https://innovationsfonden.dk/da" target="_blank">
          <img src="../assets/images/innovationsfonden.png" class="icon" />
        </a>
      </div>
      <div class="col s2 offset-s1 center-align">
        <a href="http://dd-decaf.eu/" target="_blank">
          <img src="../assets/images/decaf-logo-md.png" class="icon" />
        </a>
      </div>
      <div class="col s2 offset-s1 center-align">
        <img src="../assets/images/eu_flag_yellow_low.png" class="icon" /><br>
        <span class="fund-span">This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 686070.</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
footer {
  margin-top: 100px;
}

p {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 60px;
}

.icon {
  width: 100%;
  margin: 0;
}

.fund-span {
  font-size: 12px;
  line-height: 0;
}
</style>
