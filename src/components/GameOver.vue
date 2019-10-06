<template>
  <div class="gameOver" :class="{gameOver__active: isGameOver}">
    <p class="text">Game over!</p>
    <div class="sendScore" v-if="!hasSendScore">
      <p>Your total score is: {{score}}</p>
      <input type="text" placeholder="name" v-model="name" maxlength="8" />
      <button @click="writeUserData">Send Score</button>
    </div>
    <div class="leaderBoard">
      <h2>LeaderBoard</h2>
      <li v-for="leader in leaderBoard" :key="leader">
        <span>{{leader.name}}</span>
        {{leader.score}}
      </li>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "GameOver",
  components: {
    Button
  },
  props: ["newGame", "text", "isGameOver", "score"],
  data() {
    return {
      leaderBoard: [],
      name: "",
      hasSendScore: false
    };
  },
  mounted() {
    this.getLeaders();
  },
  methods: {
    getLeaders() {
      const db = this.$firebase.firestore();
      db.collection("HighScore")
        .orderBy("score", "desc")
        .limit(10)
        .get()
        .then(querySnapshot => {
          this.leaderBoard = [];
          querySnapshot.forEach(doc => {
            this.leaderBoard.push({
              name: doc.data().name,
              score: doc.data().score
            });
          });
        });
    },
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
        this.hasSendScore = true;
      }
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
    margin-top: 24px;
    z-index: 9;
  }

  .leaderBoard {
    z-index: 1;
    margin-top: 24px;

    h2 {
      font-size: 24px;
      margin-bottom: 16px;
    }

    span {
      color: $c-02;
      font-size: 16px;
    }

    li {
      list-style: none;
    }
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
    letter-spacing: 3px;
    font-size: 30px;
    opacity: 0;

    @include md {
      font-size: 22px;
    }
  }

  .btn {
    transform: translateY(20px);
    transition: all 0.6s ease;
    z-index: 1;
  }
}
</style>
