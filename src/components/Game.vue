<template>
<div class="gameContainer">
  <div class="mainTitle">2048</div>

  <div class="controls">
    <Score :scoreTotal="scoreTotal" :scoreNumber="scoreNumber" :highScore="highScore" :scoreAnimation="scoreAnimation" />
    <div class="">
      <p class="scoreTitle">Highest Score:</p>
      <p class="scoreTotal">{{highScore}}</p>
    </div>
    <Button @click.native="newGame" />
  </div>

  <div class="game">
    <ul class="game__grid" ref="grid">
      <Piece v-for="(tile, index) in tiles" :key="tile" :tile="tile" :sumPiece="sumPiece" :pieceWidth="widthPiece" v-show="tile.numbers" />
    </ul>
    <ul class="game__board">
      <li v-for="piece in board" class="item" :key="piece.id"></li>
    </ul>
    <transition appear-to-class="gameOver__active" v-show="isGameOver">
      <GameOver :newGame="newGame" :isGameOver="isGameOver" />
    </transition>
  </div>
</div>
</template>


<script>
import Piece from "@/components/Piece.vue";
import Button from "@/components/Button.vue";
import GameOver from "@/components/GameOver.vue";
import Score from "@/components/Score.vue";
export default {
  name: "Game",
  props: [""],
  components: {
    Piece,
    Button,
    GameOver,
    Score
  },
  data() {
    return {
      size: 16,
      rowSize: 4,
      board: [],
      tiles: [],
      scoreTotal: 0,
      scoreNumber: 0,
      sumParcial: 0,
      highScore: 0,
      getEmpty: "",
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
        },


    ],
    isSlide: false,
      isGameOver: false,
      scoreAnimation: false,
      sumPiece: false,
      index: 0,
      initialX: null,
      initialY: null
  };
},
mounted() {
    this.renderBoard();
    this.addRandomNumber(2);
    var storedValue = localStorage.getItem("score");
    this.highScore = storedValue;
    window.addEventListener("keydown", this.gameLogic);
    window.addEventListener("touchstart", this.startTouch);
    window.addEventListener("touchmove", this.moveTouch);
  },
  methods: {
    async gameLogic({keyCode}) {
      this.isSlide = false;
      this.gameMove(keyCode);
      await this.afterCombine(keyCode);
    },
    async afterCombineMobile(e, diffX, diffY){
        await this.delay();
        if (this.initialX === null) return;
        if (this.initialY === null) return;



        if (Math.abs(diffX) > Math.abs(diffY) || Math.abs(diffX) < Math.abs(diffY)) {
          this.moves.forEach(item => item.move = false);

          if (this.isSlide) {
              this.isGameOver = false;
              this.addRandomNumber(1);
          }

          const allFilled = this.board.filter(element => Object.entries(element.tiles).length != 0);
          if (allFilled.length === this.board.length && this.gameOver()) {
            localStorage.setItem('score', this.scoreTotal);
            var storedValue = localStorage.getItem("score");
            this.isGameOver = true;
            if (this.scoreTotal >= storedValue) this.highScore = storedValue;

          }

          this.scoreNumber = this.sumParcial;
          this.sumParcial = 0;
         }
    },
    async afterCombine(keyCode){
      await this.delay();
      if (keyCode === 40 || keyCode === 38 || keyCode === 37 || keyCode === 39) {
        this.moves.forEach(item => item.move = false);

        if (this.isSlide) {
            this.isGameOver = false;
            this.addRandomNumber(1);
        }

        const allFilled = this.board.filter(element => Object.entries(element.tiles).length != 0);
        if (allFilled.length === this.board.length && this.gameOver()) {
          localStorage.setItem('score', this.scoreTotal);
          var storedValue = localStorage.getItem("score");
          this.isGameOver = true;
          if (this.scoreTotal >= storedValue) this.highScore = storedValue;

        }

        this.scoreNumber = this.sumParcial;
        this.sumParcial = 0;
      }
    },
    async sumNumbers(collumn) {

      for (let i = 0; i < collumn.length - 1; i++) {

        let sum = collumn[i].tiles.numbers != undefined && collumn[i + 1].tiles.numbers != undefined ? collumn[i].tiles.numbers == collumn[i + 1].tiles.numbers : false;
        let getTile = this.tiles.find(tile => tile.id === collumn[i].id),
          deletePreviousTile = this.tiles.find(tile => tile.id === collumn[i + 1].id);

        if (sum && getTile) {

          //bloco seguinte - fazer slide da peça para cima da outra peça, somar uma com a outra;
          deletePreviousTile.left = getTile.left;
          deletePreviousTile.top = getTile.top;
          getTile.sumPiece = true;
          await this.afterSum(collumn, i, getTile, deletePreviousTile);
          this.slide(collumn);
        }

      }
    },
    async afterSum(collumn, i, getTile, deletePreviousTile) {
      await this.delay();
      collumn[i + 1].tiles = {};
      let sumNumbers = getTile.numbers += deletePreviousTile.numbers;
      getTile.numbers = sumNumbers;
      this.index = this.tiles.findIndex(item => item.id === deletePreviousTile.id);
      this.tiles.splice(this.index, 1);
      //remover o tile que esta por baixo da peça ja somada;
      this.scoreTotal += sumNumbers;
      this.sumParcial += sumNumbers;
      this.scoreAnimation = true;
      getTile.sumPiece = false;
      this.isSlide = true;


    },
    renderBoard() {
      let widthGrid = this.$refs.grid.clientWidth,
          pieceSize = (widthGrid - 20) / this.rowSize;
        this.widthPiece = (widthGrid - 90) / this.rowSize;


      for (let r = 0; r < this.size; r++) {
        let x = Math.floor(r / this.rowSize),
          y = r - Math.floor(r / this.rowSize) * this.rowSize;
        this.board.push({
          x: x,
          y: y,
          id: r,
          tiles: {},
          left: pieceSize * y,
          top: pieceSize * x,
        });
      }
    },
    addRandomNumber(number) {
      for (let i = 0; i < number; i++) {
        let getEmptyBoard = this.board.filter(element => Object.entries(element.tiles).length === 0 && element.tiles.constructor === Object);
        let getEmptyId = getEmptyBoard.map(element => element.id);
        let randomIndex = Math.floor(Math.random() * getEmptyId.length),
          randomBoard = this.board.find(item => item.id === getEmptyId[randomIndex]),
          randomNumber = Math.random() < 0.9 ? 2 : 4;

        this.tiles.push({
          id: randomBoard.id,
          numbers: randomNumber,
          left: randomBoard.left,
          top: randomBoard.top,
          new: true,
          sumPiece: false
        });

        let getEmptyElement = this.board.find((element) => element.id == getEmptyId[randomIndex]);
        let randomTile = this.tiles.find((element) => element.id == getEmptyId[randomIndex]);
        getEmptyElement.tiles = randomTile;



        setTimeout(() => {
          randomTile.new = false;
        }, 400);
      }
    },
    slide(collumn) {
      let that = this;
      const getNumber = collumn.filter(item => Object.entries(item.tiles).length !== 0).map(item => item),
        tileNumber = this.tiles.filter(tile => tile.numbers !== "");

      const moveArrow = this.moves.find(item => item.move == true);

      moveArrow.move = true;

      let getEmpty = "",
        newElement,
        getTile = "";

      for (let element of getNumber) {
        if (moveArrow.name == "top") getEmpty = collumn.find(item => item.x < element.x && Object.entries(item.tiles).length === 0);
        if (moveArrow.name == "bottom") getEmpty = collumn.find(item => item.x > element.x && Object.entries(item.tiles).length === 0);
        if (moveArrow.name == "left") getEmpty = collumn.find(item => item.y < element.y && Object.entries(item.tiles).length === 0);
        if (moveArrow.name == "right") getEmpty = collumn.find(item => item.y > element.y && Object.entries(item.tiles).length === 0);
        getTile = tileNumber.find(tile => tile.id === element.id);

        if (getEmpty && getTile) {


          getTile.left = getEmpty.left;
          getTile.top = getEmpty.top;

          element.tiles = {};
          getEmpty.tiles = getTile;
          getTile.id = getEmpty.id;

          // getEmpty.numbers = element.numbers;
          // element.numbers = "";

          this.isSlide = true;
        }
      }

    },
    gameMove(keyCode) {
      for (var i = 0; i < this.rowSize; i++) {
        const collumn = this.board.filter(item => item.y == i);
        const reverseCollumn = collumn.map((item, index) => collumn[collumn.length - 1 - index]);
        const row = this.board.filter(item => item.x == i);
        const reverseRow = row.map((item, index) => row[row.length - 1 - index]);

        if (keyCode === 40) {
          this.moves[0].move = true;
          this.combine(reverseCollumn);


        }
        if (keyCode === 38) {
          this.moves[1].move = true;
          this.combine(collumn);


        }
        if (keyCode === 39) {
          this.moves[2].move = true;
          this.combine(reverseRow);


        }
        if (keyCode === 37) {
          this.moves[3].move = true;
          this.combine(row);


        }
      }},
    delay() {
      return new Promise(resolve => setTimeout(resolve, 100));
    },
    combine(collumn) {
      this.slide(collumn);
      this.sumNumbers(collumn);
      setTimeout(() => {
        this.scoreAnimation = false;
      }, 400);
    },
    newGame() {
      this.board = [];
      this.tiles = [];
      this.renderBoard();
      this.addRandomNumber(2);
      this.scoreTotal = 0;
      this.scoreNumber = 0;
      this.isGameOver = false;

    },
    gameOver() {
      for (var i = 0; i < this.rowSize; i++) {
        const collumn = this.board.filter(item => item.y == i);
        const reverseCollumn = collumn.map((item, index) => collumn[collumn.length - 1 - index]);
        const row = this.board.filter(item => item.x == i);
        const reverseRow = row.map((item, index) => row[row.length - 1 - index]);

        for (var j = 0; j < this.rowSize - 1; j++) {
          if (collumn[j].tiles.numbers == collumn[j + 1].tiles.numbers && collumn[j].tiles.numbers !== "") {
            this.isGameOver = false;
            return false;
          }
          if (row[j].tiles.numbers == row[j + 1].tiles.numbers && row[j].tiles.numbers != "") {
            this.isGameOver = false;
            return false;
          }
          if (reverseCollumn[j].tiles.numbers == reverseCollumn[j + 1].tiles.numbers && reverseCollumn[j].tiles.numbers != "") {
            this.isGameOver = false;
            return false;
          }
          if (reverseRow[j].tiles.numbers == reverseRow[j + 1].tiles.numbers && reverseRow[j].tiles.numbers != "") {
            this.isGameOver = false;
            return false;
          }
        }
      }
      return true;
    },
    gameWon() {
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i].tiles.numbers === 2048) this.win = true;
      }
      return false;
    },
    startTouch(e) {
      this.initialX = e.touches[0].clientX;
      this.initialY = e.touches[0].clientY;
    },
    async moveTouch(e) {
        e.preventDefault();
      this.isSlide = false;
      if (this.initialX === null) return;
      if (this.initialY === null) return;

      let currentX = e.touches[0].clientX,
        currentY = e.touches[0].clientY,
        diffX = this.initialX - currentX,
        diffY = this.initialY - currentY;

        for (var i = 0; i < this.rowSize; i++) {
          const collumn = this.board.filter(item => item.y == i);
          const reverseCollumn = collumn.map((item, index) => collumn[collumn.length - 1 - index]);
          const row = this.board.filter(item => item.x == i);
          const reverseRow = row.map((item, index) => row[row.length - 1 - index]);

          if (Math.abs(diffX) > Math.abs(diffY)) {

            if (diffX > 0) {
              this.moves[3].move = true;
              this.combine(row);
            } else {
              this.moves[2].move = true;
              this.combine(reverseRow);
            }
          } else {
            if (diffY > 0) {
              this.moves[1].move = true;
              this.combine(collumn);
            } else {
              this.moves[0].move = true;
              this.combine(reverseCollumn);
            }
          }

      }

        await this.afterCombineMobile(e, diffX, diffY);
      this.initialX = null;
      this.initialY = null;


    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
$c-01: #f9d1c0;

@mixin lg {
   @media screen and (max-width: 850px) {
      @content;
   }
}
@mixin md {
   @media screen and (max-width: 650px) {
      @content;
   }
}

@mixin sm {
   @media screen and (max-width: 500px) {
      @content;
   }
}

.gameContainer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.mainTitle {
    font-size: 350px;
    position: absolute;
    z-index: 0;
    color: $c-01;
    font-weight: 600;
    transform: translateY(-320px);
    opacity: 0.6;
    transition: all 0.5s ease;

    @include md {
      transform: translateY(-250px);
      font-size: 280px;
   }
   @include sm {
      transform: translateY(-170px);
      font-size: 180px;
   }
}

.controls {
    max-width: 540px;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
}

.game {
    position: relative;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    width: 500px;
    height: 500px;

    @include md {
            width: 400px;
            height: 400px;
         }

         @include sm {
            width: 280px;
            height: 280px;

         }

    &__grid {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        justify-content: center;
        margin: 0;
        padding: 0;
        position: absolute;
        left: 20px;
        top: 20px;
    }

    &__board {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        margin: 0;
        padding: 0;
        justify-content: center;
    }

    .item {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        box-shadow: inset 0 0 40px 0 darken(#fdf5f0, 8%);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* .fade-leave-active below version 2.1.8 */
}

.gameOver__active {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    transition: all 1s ease;
    opacity: 1;

    .text {
        font-size: 40px;
        opacity: 1;
        letter-spacing: 3px;
        transition: 0.4s ease;
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
</style>
