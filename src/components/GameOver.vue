<template>
  <div class="gameOver" :class="{gameOver__active: isGameOver}">
    <p class="gameOver__text" v-if="!sendScore">Game over!</p>
    <div class="gameOver__sendScore" v-if="!sendScore">
      <p class="gameOver__description">Your total score is: {{score}}</p>
      <input class="inputSendScore" type="text" placeholder="name" v-model="name" maxlength="16"/>
      <button @click="writeUserData" class="alternate" :btnText="btnText">send score</button>
    </div>
    <p class="gameOver__scoreDescription" v-show="sendScore">Your score was sent!</p>
    <button v-show="sendScore" class="alternate" @click="openLeaderboard">Leaderboard</button>
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
      btnText: "send score"
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

        this.getLeaders();
        return this.$store.commit("sendScore", true);
      }
    },
     getLeaders() {
      const db = this.$firebase.firestore();
      db.collection("HighScore")
        .orderBy("score", "desc")
        .limit(10)
        .get()
        .then(querySnapshot => {
          this.$store.commit('dataScore', []);
          querySnapshot.forEach(doc => {
            this.leaderBoard.push({
              name: doc.data().name,
              score: doc.data().score
            });
             this.$store.commit('dataScore', this.leaderBoard);
          });
        });
       
    },
    openLeaderboard() {
      this.$store.commit("modal", true);
    }
  },
  computed: {
    sendScore() {
      return this.$store.state.hasSendScore;
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@import "@/styles/layout.scss";

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

  &__sendScore {
    margin-top: 48px;
    z-index: 9;
  }

  &__description {
    color: $c-02;
  }

  &__text {
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

    @include md {
      font-size: 20px;
    }
  }

  &__scoreDescription {
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
    margin-bottom: 30px;
    transform: translateY(20px);
    transition: 0.5s ease all;
     opacity: 1;
  }

  .btn {
    transform: translateY(20px);
    transition: all 0.6s ease;
    z-index: 1;
    margin: 0 auto;
  }

  .inputSendScore {
    padding: 10px 15px;
    border-radius: 5px;
    box-shadow: 0 8px 15px -5px rgba($c-02, 0.3);
    border: 0;
    background: white;
    transition: 0.4s ease all;
    color: $c-02;
    margin: 30px 0;
    width: 200px;

    &::placeholder {
      color: $c-02;
    }

    &:focus {
      outline: 0;
      box-shadow: 0 2px 5px -5px rgba($c-02, 0.8);
    }
  }
}

.alternate{
    opacity: 0;
}
</style>
