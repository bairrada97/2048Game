<template>
<div class="">
  <button type="button" name="button" @click="newGame">new game</button>
  <div class="score">
    <h2 class="scoreTitle">Your Score:</h2>
    <p>{{scoreTotal}}</p>
    <span>+{{scoreNumber}}</span>
  </div>
  <div class="gameOver" v-if="noPossibleMoves">
    <p>Game over!</p>
    <button type="button" name="button" @click="newGame">try again</button>
  </div>
  <div class="game">
    <ul class="game__grid">
      <Piece v-for="(piece, index) in board" :key="index" :piece="piece"/>
    </ul>
  </div>

</div>

</div>
</template>


<script>
import Piece from '@/components/Piece.vue';
export default {
  name: 'Game',
  props: [''],
  components: {
    Piece
  },
  data() {
    return {
      size: 16,
      rowSize: 4,
      board: [],
      scoreTotal: 0,
      scoreNumber: 0,
      getEmpty: "",
      bottom: false,
      top: false,
      left: false,
      right: false,
      noPossibleMoves: false,
      win: false

    }

  },
  mounted() {
    this.renderBoard();
    this.addRandomNumber(2);
    window.addEventListener('keydown', ({
      keyCode
    }) => {
      for (var i = 0; i < this.rowSize; i++) {
        const collumn = this.board.filter(item => item.y == i);
        const reverseCollumn = collumn.map((item, index) => collumn[collumn.length - 1 - index]);
        const row = this.board.filter(item => item.x == i);
        const reverseRow = row.map((item, index) => row[row.length - 1 - index]);

        if (keyCode === 40) {
          this.bottom = true;
          this.combine(reverseCollumn);
          this.bottom = false;

        }
        if (keyCode === 38) {
          this.top = true;
          this.combine(collumn);
          this.top = false;
        }
        if (keyCode === 37) {
          this.left = true;
          this.combine(row);
          this.left = false;
        }
        if (keyCode === 39) {
          this.right = true;
          this.combine(reverseRow);
          this.right = false;
        }

      }
      if (keyCode === 40 || keyCode === 38 || keyCode === 37 || keyCode === 39  ) {

          this.addRandomNumber(1);
          // this.gameWon();
          // if (this.win) console.log('game Won');
          this.gameOver();
          if ( this.noPossibleMoves) console.log('game Over');


      }
    });


  },
  methods: {
    renderBoard() {
      for (let r = 0; r < 16; r++) {
        let x = Math.floor(r / this.rowSize),
          y = r - (Math.floor(r / this.rowSize) * this.rowSize);
        this.board.push({
          x: x,
          y: y,
          id: r,
          numbers: ""
        });

      }
    },
    addRandomNumber(number) {

      for (let i = 0; i < number; i++) {
        let boardMap = this.board.filter(element => element.numbers == "");
        let randomTile = boardMap[Math.floor(Math.random() * boardMap.length)],
          randomNumber = Math.random() < 0.9 ? 2 : 4;

        if (number == 1 && boardMap.length == 0) {
          this.noPossibleMoves = true;
        } else {
          randomTile.numbers = randomNumber;
        }



      }

    },
    slide(collumn) {
      var that = this;
      const getNumber = collumn.filter(item => item.numbers !== "");
      let getEmpty = "";
      this.NoPossibleMoves = false;
      for (let element of getNumber) {

        if (that.top) getEmpty = collumn.filter(item => item.x < element.x && item.numbers == "");
        if (that.bottom) getEmpty = collumn.filter(item => item.x > element.x && item.numbers == "");
        if (that.left) getEmpty = collumn.filter(item => item.y < element.y && item.numbers == "");
        if (that.right) getEmpty = collumn.filter(item => item.y > element.y && item.numbers == "");

        const [firstIndex] = getEmpty;

        if (getEmpty.length > 0) {
          firstIndex.numbers = element.numbers;
          element.numbers = "";
          this.NoPossibleMoves = false;
        } else {

          continue

        }
        this.NoPossibleMoves = true;

      }


    },
    sumNumbers(row) {

      for (var i = 0; i < row.length - 1; i++) {
        if (row[i].numbers == row[i + 1].numbers) {
          row[i].numbers += row[i + 1].numbers;
          this.scoreNumber = ~~row[i].numbers;
          this.scoreTotal += ~~row[i].numbers;

          row[i + 1].numbers = "";

        }
      }
    },
    combine(collumn) {
      this.slide(collumn);
      this.sumNumbers(collumn);
      this.slide(collumn);

    },
    newGame() {
      this.board = [];
      this.renderBoard();
      this.addRandomNumber(2);
      this.scoreTotal = 0;
    },
    gameOver() {
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i].number !== "") {
  
          continue;
        }else{
            this.noPossibleMoves = false;
          return
        }

        this.noPossibleMoves = true;

      }

    },
    gameWon() {
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i].numbers === 2048) this.win = true;
      }
      return false;
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.game {
    padding: 20px;
    box-sizing: border-box;
    background: #bbada0;

    &__grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border-radius: 6px;
        grid-row-gap: 10px;
        grid-column-gap: 10px;

    }
}
</style>
