<template>
<main id="app">

  <Game />
</main>
</template>

<script>
import Game from '@/components/Game.vue';
import store from './store';

export default {
  name: 'app',
  components: {
    Game
  }
}

//board 4x4
// 4 direction - up, bottom, left, right
//start with 2 random pieces with number 2 or 4
//Slide as far as possible in the chosen direction until they are stopped by either another tile
//Sum pieces only one time
//appear a random number 2 or 4 in blank tile
//won when reach 2048 but able to keep playing
//lose when there is no available moves

//functions
  //initBoard();
  //ResetBoard();
  //AddTwoRandomNumberonInit();
  //AddRandomNumber();
  //Slide();
  //Sum();
  //LoseGame();

</script>

<style lang="scss">
@import '@/styles/reset.scss';
@import url("https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700,800,900|Barlow+Semi+Condensed:300,400,500,600,700,800,900|Barlow:300,400,500,600,700,800,900&display=swap");



#app {
    font-family: "Barlow", sans-serif;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffe4d4;


}


</style>
