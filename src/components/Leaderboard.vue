<template>
  <div class="leaderBoard" :class="{leaderBoard__active: openModal}">
    <div class="leaderBoard__container">
      <svg  @click="closeModal" class="leaderBoard__closeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>
      <h2>LeaderBoard</h2>
      <ul>
        <li v-for="leader in leaderBoardVisualizer" :key="leader">
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
    closeModal() {
      this.$store.commit("modal", false);
    }
  },
  computed:{
     openModal() {
      return this.$store.state.openModal;
    },
    leaderBoardVisualizer(){
      return this.$store.state.leaderBoard[0]
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@import "@/styles/layout.scss";

.leaderBoard {
  z-index: -1;
  background: rgba($c-01, 0.8);
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;


  &__container {
    width: calc(70% - 100px);
    height: calc(80vh - 100px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $bg-01;
    border-radius: 10px;
    display: flex; 
    flex-direction: column;
    box-sizing: border-box;
    padding: 80px 5%;
    transition: 0.4s ease all;

    
    h2,li{
      opacity: 0;
      z-index: 2;
      transform: translateY(40px);
        transition: 0.4s ease all;
    }


    @include lg {
      width: 90%;
      height: 100%;
      padding: 60px 8%;
    }
  }

  &__closeIcon {
    position: absolute;
    width: 32px;
    right: 40px;
    top: 40px;
    fill: $c-02;
    cursor: pointer;
    transition: 0.3s ease all;

    &:hover{
      transform: rotate(90deg);
    }

      @include md {
      top: 20px;
      right: 20px;
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

  ul {
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
