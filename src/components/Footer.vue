<template>
  <footer>
  <div class="mdc-layout-grid">
  <div class="mdc-layout-grid__inner">
    <div class="mdc-layout-grid__cell--span-2"></div>
    <div class="mdc-layout-grid__cell--span-8">
    <p >The initial development of memote has received funding from:</p>
    </div>
    </div>
    <div class="mdc-layout-grid__inner">
    <div class="mdc-layout-grid__cell--span-2"></div>
    <div class="mdc-layout-grid__cell--span-2">
        <a href="http://novonordiskfonden.dk/en" target="_blank">
          <img src="../assets/images/novo_nordisk.png" class="icon nordisk" />
        </a>
    </div>
    <div class="mdc-layout-grid__cell--span-2">
      <a href="https://innovationsfonden.dk/da" target="_blank">
        <img src="../assets/images/innovationsfonden.png" class="icon" />
      </a>
    </div>
    <div class="mdc-layout-grid__cell--span-2">
      <a href="http://dd-decaf.eu/" target="_blank">
        <img src="../assets/images/decaf-logo-md.png" class="icon" />
      </a>
    </div>
    <div class="mdc-layout-grid__cell--span-2">
      <img src="../assets/images/eu_flag_yellow_low.png" class="icon" /><br>
      <span class="fund-span">
        This project has received funding from the European Union’s Horizon 2020 research and innovation programme
        under grant agreement No 686070.
      </span>
    </div>
  </div>
  </div>
  </footer>
</template>

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
