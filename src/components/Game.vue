<template>
  <div class="gameContainer">
    <div class="mainTitle">2048</div>

    <div class="controls">
      <Score :scoreTotal="scoreTotal" :scoreNumber="scoreNumber" />
      <Button @click.native="newGame" :btnText="text" />
    </div>

    <div class="game">
      <ul class="game__grid" ref="grid">
        <Piece v-for="(tile, index) in tiles" :key="index" :tile="tile" v-show="tile.numbers" />
      </ul>
      <ul class="game__board">
        <li v-for="piece in board" class="item" :key="piece.id"></li>
      </ul>

      <GameOver v-show="isGameOver" :newGame="newGame" :isGameOver="isGameOver" />
    </div>
    <button @click="ze" type="button" name="button">ze</button>
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
      getEmpty: "",
      bottom: false,
      top: false,
      left: false,
      right: false,
      isSlide: false,
      isGameOver: false
    };
  },
  mounted() {
    var that = this;
    that.renderBoard();
    that.addRandomNumber(2);
    window.addEventListener("keydown", ({ keyCode }) => {
      that.isSlide = false;
      that.isGameOver = false;

      for (var i = 0; i < that.rowSize; i++) {
        const collumn = that.board.filter(item => item.y == i);
        const reverseCollumn = collumn.map(
          (item, index) => collumn[collumn.length - 1 - index]
        );
        const row = that.board.filter(item => item.x == i);
        const reverseRow = row.map(
          (item, index) => row[row.length - 1 - index]
        );

        if (keyCode === 40) {
          that.bottom = true;
          that.combine(reverseCollumn);
          that.bottom = false;
        }
        if (keyCode === 38) {
          that.top = true;
          that.combine(collumn);
          that.top = false;
        }
        if (keyCode === 37) {
          that.left = true;
          that.combine(row);
          that.left = false;
        }
        if (keyCode === 39) {
          that.right = true;
          that.combine(reverseRow);
          that.right = false;
        }
      }
      if (
        keyCode === 40 ||
        keyCode === 38 ||
        keyCode === 37 ||
        keyCode === 39
      ) {
        if (that.isSlide) {
          setTimeout(function() {
            that.addRandomNumber(1);
          }, 2000);
        }

        const allFilled = that.board.filter(element => element.numbers !== "");
        //this.tiles.sort((a,b) => a.id - b.id)
        //if (allFilled.length === that.board.length && that.gameOver()) that.isGameOver = true;
      }
    });
  },
  methods: {
    renderBoard() {
      let widthGrid = this.$refs.grid.clientWidth,
        widthPiece = (widthGrid + 20) / this.rowSize;

      for (let r = 0; r < this.size; r++) {
        let x = Math.floor(r / this.rowSize),
          y = r - Math.floor(r / this.rowSize) * this.rowSize;
        this.board.push({
          x: x,
          y: y,
          id: r,
          tiles: {},
          left: widthPiece * y,
          top: widthPiece * x
        });
      }
    },
    addRandomNumber(number) {
      for (let i = 0; i < number; i++) {
        let randomIndex = Math.floor(Math.random() * this.getEmptyBoard.length - 1), 
          getBoard = this.getEmptyBoard[randomIndex].id,
          randomBoard = this.getEmptyBoard.find(item => item.id == getBoard),
          randomNumber = Math.random() < 0.9 ? 2 : 4;
        this.tiles.push({
          id: randomBoard.id,
          numbers: randomNumber,
          left: randomBoard.left,
          top: randomBoard.top
        });
        const getTile = this.tiles.filter(item => item.id == randomIndex);
        randomBoard.tiles = getTile;
        console.log(getTile, randomBoard);
      }
    },
    slide(collumn) {
      var that = this;
      const getNumber = collumn.filter(item => {
          return Object.keys(item.tiles).length > 0;
        }),
        tileNumber = this.tiles.filter(tile => tile.numbers !== "");

      let getEmpty = "",
        newElement,
        getTile = "";
      for (let element of getNumber) {
        if (that.top)
          getEmpty = collumn.find(
            item =>
              item.x < element.x &&
              Object.entries(item.tiles).length === 0 &&
              item.tiles.constructor === Object
          );
        if (that.bottom)
          getEmpty = collumn.find(
            item =>
              item.x > element.x &&
              Object.entries(item.tiles).length === 0 &&
              item.tiles.constructor === Object
          );
        if (that.left)
          getEmpty = collumn.find(
            item =>
              item.y < element.y &&
              Object.entries(item.tiles).length === 0 &&
              item.tiles.constructor === Object
          );
        if (that.right)
          getEmpty = collumn.find(
            item =>
              item.y > element.y &&
              Object.entries(item.tiles).length === 0 &&
              item.tiles.constructor === Object
          );
        getTile = tileNumber.find(tile => tile.id === element.id);

        if (getEmpty && getTile) {
          getTile.left = getEmpty.left;
          getTile.top = getEmpty.top;

          element.tiles = {};
          getEmpty.tiles = getTile;
          getTile.id = getEmpty.id;

          // getEmpty.numbers = element.numbers;
          // element.numbers = "";

          that.isSlide = true;
        }
      }
      //this.newArray.sort((a, b) => a.id - b.id);
    },
    sumNumbers(row) {
      for (var i = 0; i < row.length - 1; i++) {
        let sum =
          row[i].tiles.numbers != undefined &&
          row[i + 1].tiles.numbers != undefined
            ? row[i].tiles.numbers == row[i + 1].tiles.numbers
            : false;
        let tileNumber = this.tiles.filter(tile => tile.numbers !== "");
        let getTile = tileNumber.find(tile => tile.id === row[i].id);
        let deletePreviousTile = tileNumber.find(
          tile => tile.id === row[i + 1].id
        );

        if (sum && getTile) {
          deletePreviousTile.left = getTile.left;
          deletePreviousTile.top = getTile.top;
          let sumNumbers = (row[i].tiles.numbers += row[i + 1].tiles.numbers);
          getTile.numbers = sumNumbers;
          //
          row[i + 1].tiles.numbers = "";
          row[i + 1].tiles = {};
          deletePreviousTile = {
            id: deletePreviousTile.id,
            numbers: "",
            left: deletePreviousTile.left,
            top: deletePreviousTile.top
          };
          // this.scoreNumber = ~~row[i].numbers;
          // this.scoreTotal += ~~row[i].numbers;

          this.isSlide = true;
          //
        }
      }
    },
    combine(collumn) {
      this.slide(collumn);
      //this.sumNumbers(collumn);
      //this.slide(collumn);

      //console.log(this.board);
    },
    // newGame() {
    //   this.board = [];
    //   this.renderBoard();
    //   this.addRandomNumber(2);
    //   this.scoreTotal = 0;
    //   this.isGameOver = false;
    //
    // },
    gameOver() {
      for (var i = 0; i < this.rowSize; i++) {
        const collumn = this.board.filter(item => item.y == i);
        const reverseCollumn = collumn.map(
          (item, index) => collumn[collumn.length - 1 - index]
        );
        const row = this.board.filter(item => item.x == i);
        const reverseRow = row.map(
          (item, index) => row[row.length - 1 - index]
        );

        for (var j = 0; j < this.rowSize - 1; j++) {
          if (
            collumn[j].numbers == collumn[j + 1].numbers &&
            collumn[j].numbers !== " "
          ) {
            this.isGameOver = false;
            return false;
          }
          if (row[j].numbers == row[j + 1].numbers && row[j].numbers != "") {
            this.isGameOver = false;
            return false;
          }
          if (
            reverseCollumn[j].numbers == reverseCollumn[j + 1].numbers &&
            reverseCollumn[j].numbers != ""
          ) {
            this.isGameOver = false;
            return false;
          }
          if (
            reverseRow[j].numbers == reverseRow[j + 1].numbers &&
            reverseRow[j].numbers != ""
          ) {
            this.isGameOver = false;
            return false;
          }
        }
      }
      return true;
    },
    ze() {
      this.isGameOver = true;
    }
    // gameWon() {
    //   for (var i = 0; i < this.board.length; i++) {
    //     if (this.board[i].numbers === 2048) this.win = true;
    //   }
    //   return false;
    // }
  },
  computed: {
    getEmptyBoard() {
      return this.board.filter(
        element =>
          Object.entries(element.tiles).length === 0 &&
          element.tiles.constructor === Object
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
$c-01: #f9d1c0;

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
}

.controls {
  width: 540px;
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

  &__grid {
    width: 500px;
    height: 500px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin: 0;
    padding: 0;
    position: absolute;
    left: 20px;
  }

  &__board {
    width: 500px;
    height: 500px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin: 0;
    padding: 0;
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

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.1s ease;
  }

  .slide-enter-active {
    opacity: 1;
  }
  /* .fade-leave-active below version 2.1.8 */
}
</style>
