<template>
  <main id="app">
    <div class="wrapper">
      <Game />
      <transition appear-to-class="leaderBoard__active" v-show="openModal">
        <Leaderboard />
      </transition>
      <div class="gameMakers">
        <p>
          By
          <a target="_blank" href="https://joaobairrada.com" rel="noopener">João Bairrada</a> and
          <a target="_blank" href="https://rafaelalucas.com/" rel="noopener">Rafaela Lucas</a>
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import Game from "@/components/Game.vue";
import store from "./store";
import Leaderboard from "@/components/Leaderboard.vue";

export default {
  name: "app",
  components: {
    Game,
    Leaderboard
  },
  computed: {
    sendScore() {
      return this.$store.state.hasSendScore;
    },
    openModal() {
      return this.$store.state.openModal;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/layout.scss";
@import url("https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700,800,900|Barlow+Semi+Condensed:300,400,500,600,700,800,900|Barlow:300,400,500,600,700,800,900&display=swap");

$c-02: #7084a1;

#app {
  font-family: "Barlow", sans-serif;
  height: 100vh;
  background: #ffe4d4;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  //pointer-events: none;

  .wrapper {
    margin: 0 auto;
    max-width: 1440px;
    width: 90%;
    padding: 0 5%;
    position: relative;
    display: block;
    height: 100vh;
  }

  .gameMakers {
    width: 100%;
    margin: 40px auto 20px;
    text-align: center;
    color: #a9abbf;
    font-family: "Barlow Semi Condensed";
    font-size: 12px;
    letter-spacing: 0.5px;

    a {
      position: relative;
      font-weight: 500;
      color: #a9abbf;
      cursor: pointer;

      &:after {
        content: "";
        position: absolute;
        bottom: -1.5px;
        right: 0;
        width: 100%;
        height: 1px;
        transition: all 0.3s ease;
        background-color: #a9abbf;
      }

      &:hover {
        color: $c-02;

        &:after {
          width: 0;
          left: 0;
          background-color: $c-02;
        }
      }
    }
  }

  .leaderBoard__active {
    border-radius: 5px;
    transition: all 1s ease;
    opacity: 1;
    visibility: visible;
    z-index: 1;

    .leaderBoard__container{
      *{z-index: 2;}
    }

    .gameOver__text {
      font-size: 28px;
      opacity: 1;
      letter-spacing: 1.5px;
      transition: 0.4s ease;

      @include md {
        font-size: 24px;
      }
    }

    .btn {
      transform: translateY(0px);
      transition: all 0.6s ease;
    }

    &:after,
    &:before {
      border-radius: 5px;
      transition: all 0.5s ease;
    }
  }
}
</style>
