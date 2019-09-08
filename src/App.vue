<template>
  <main id="app">
     <div class="wrapper">
        <Game />
     </div>

  </main>
</template>

<script>
import Game from "@/components/Game.vue";
import store from "./store";

export default {
  name: "app",
  components: {
    Game
  }
};
</script>

<style lang="scss">
@import "@/styles/reset.scss";
@import url("https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700,800,900|Barlow+Semi+Condensed:300,400,500,600,700,800,900|Barlow:300,400,500,600,700,800,900&display=swap");

#app {
  font-family: "Barlow", sans-serif;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffe4d4;

  .wrapper{
    margin: 0 auto;
    max-width: 1440px;
    width: 90%;
    padding: 0 5%;
    position: relative;
    display: block;
  }
}
</style>
