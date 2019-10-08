<template>
    <div class="leaderBoard">
        <div class="leaderBoard__container">
            <h2>LeaderBoard</h2>
            <ul>
                <li v-for="leader in leaderBoard" :key="leader">
                <span class="leaderboard__name">{{leader.name}}</span>
                <span class="leaderboard__score">{{leader.score}}</span>
            </li>
            </ul>
         
        </div>
    </div>
</template>

<script>


export default {
  name: "Leaderboard",
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
  @media screen and (max-width: 650px){
    @content;
  }
}

@mixin sm {
  @media screen and (max-width: 500px), screen and (max-height: 660px) {
    @content;
  }
}

.leaderBoard {
    z-index: 1;
    background: rgba($c-01, 0.8);
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;

    &__container{
        width: 70%;
        height: 80vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); 
        background: $bg-01;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        box-sizing: border-box;
        padding: 80px 5%;

        @include md{
          width: 90%;
          height: auto;
          padding: 60px 8%;
        }
    }

    h2 {
        font-size: 20px;
        text-align: center;
        color: $c-02;
        text-transform: uppercase;
        font-weight: 500;
        margin-bottom: 50px;
    }

    span {
      color: $c-02;
      font-size: 16px;
    }


    ul{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    li {
     list-style: none;
   
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
    max-width: 300px;
    margin: 8px 0;
    border-bottom: 1px solid rgba($c-02, 0.3);
    padding: 0 2px 5px;
    }
  }

</style>
