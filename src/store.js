import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    size: 16,
    rowSize: 4,
    board: [],
    tiles: [],
    scoreTotal: 0,
    scoreNumber: 0,
    sumParcial: 0,
    highScore: 0,
    getEmpty: "",
    btnActiveClicked: false,
    widthPiece: 0,
    moves: [
      {
        name: "bottom",
        move: false
      },
      {
        name: "top",
        move: false
      },
      {
        name: "right",
        move: false
      },
      {
        name: "left",
        move: false
      }
    ],
    isSlide: false,
    isGameOver: false,
    scoreAnimation: false,
    sumPiece: false,
    index: 0,
    initialX: null,
    initialY: null,
    diffY: null,
    diffX: null,
    instructions: "",
    dragging: false,
    openModal: false,
    hasSendScore: false,
    leaderBoard:[]
  },
  mutations: {
    modal: (state, payload) => {
      state.openModal = payload;
    },
    sendScore: (state, payload) => {
      state.hasSendScore = payload;
    },
    dataScore: (state, payload) =>{
      state.leaderBoard = [];
      state.leaderBoard.push(payload);

    }
  }
});
