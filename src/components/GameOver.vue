<template>
  <div class="gameOver" :class="{gameOver__active: isGameOver}">
    <p class="text" v-if="!hasSendScore">Game over!</p>
    <div class="sendScore" v-if="!hasSendScore">
      <p class="description">Your total score is: {{score}}</p>
      <input class="inputSendScore" type="text" placeholder="name" v-model="name"  />
      <button @click="writeUserData" class="btn alternate" :btnText="btnText">send score</button>
    </div>
    <p class="text" v-if="hasSendScore">Your score was sent!</p>
    <button v-if="hasSendScore" class="btn alternate" @click="openLeaderboard">Leaderboard</button>

  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Leaderboard from "@/components/Leaderboard.vue";

export default {
  name: "GameOver",
  components: {
    Button,
    Leaderboard
  },
  props: ["newGame", "text", "isGameOver", "score"],
  data() {
    return {
      leaderBoard: [],
      name: "",
      hasSendScore: false,
      btnText: "send score",
       openModal: false,
    };
  },
  methods: {
    writeUserData() {
      const input1 = document.querySelector("input").value;
      const db = this.$firebase.firestore();

      if (this.name != "") {
        this.leaderBoard = [];
        const data = {
          name: input1,
          score: this.score
        };
        db.collection("HighScore")
          .doc()
          .set(data);

        this.hasSendScore = true;
      
      }
    },
    openLeaderboard(){
      this.openModal = true;
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
$bg-01: #fdf5f0;
$c-01: #f9d1c0;
$c-02: #7084a1;
$c-03: #81c7b8;

@mixin md {
  @media screen and (max-width: 650px), screen and (max-height: 800px) {
    @content;
  }
}

@mixin sm {
  @media screen and (max-width: 500px), screen and (max-height: 660px) {
    @content;
  }
}

.gameOver {
  position: absolute;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  transition: all 1s ease;
  opacity: 0;
  visibility: hidden;
  text-align: center;

  &:after,
  &:before {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    content: "";
    position: absolute;
    border-radius: 100%;
    transition: all 0.4s ease;
    display: flex;
  }
  &:before {
    background-color: white;
    opacity: 0.8;
  }
  &:after {
    background-color: $c-01;
    opacity: 0.5;
    cursor: pointer;
  }

  .sendScore {
    margin-top: 50px;
    z-index: 9;
  }

  .description{
    color: $c-02;
  }

  

  .text {
    z-index: 1;
    text-align: center;
    color: $c-02;
    font-weight: 500;
    transition: all 0.6s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    letter-spacing: 1.5px;
    font-size: 28px;
    opacity: 0;
    margin-bottom: 30px;

    @include md {
      font-size: 20px;
    }
  }

  .btn {
    transform: translateY(20px);
    transition: all 0.6s ease;
    z-index: 1;
    margin: 0 auto;
  }

  .inputSendScore{
    padding: 10px 15px;
    border-radius: 5px;
    box-shadow: 0 8px 15px -5px rgba($c-02, 0.3);
    border: 0;
    background: white;
    transition: 0.4s ease all;
    color: $c-02;
    margin: 30px 0;
    width: 200px;

    &::placeholder{
      color: $c-02;
    }

    &:focus{
      outline: 0;
       box-shadow: 0 2px 5px -5px rgba($c-02, 0.8);
    }

  }
}
</style>
