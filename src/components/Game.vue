<template>
<div class="">
  <button type="button" name="button" @click="newGame">new game</button>
  <div class="score">
    <h2 class="scoreTitle">Your Score:</h2>
    <p>{{scoreTotal}}</p>
    <span>+{{scoreNumber}}</span>
  </div>
  <div class="gameOver">
    <p>Game over!</p>
    <button type="button" name="button" @click="newGame">try again</button>
  </div>
  <div class="game">
    <ul class="game__grid" ref="grid">
      <Piece v-for="(piece, index) in board" :key="index" :piece="piece" />
    </ul>
    <ul class="game__board">
      <li v-for="piece in board" class="item"></li>
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
      isSlide: false,
      isGameOver: true


    }

  },
  mounted() {
    var that = this;
    that.renderBoard();
    that.addRandomNumber(2);
    window.addEventListener('keydown', ({
      keyCode
    }) => {
      that.isSlide = false;
      that.isGameOver = true;
      for (var i = 0; i < that.rowSize; i++) {
        const collumn = that.board.filter(item => item.y == i);
        const reverseCollumn = collumn.map((item, index) => collumn[collumn.length - 1 - index]);
        const row = that.board.filter(item => item.x == i);
        const reverseRow = row.map((item, index) => row[row.length - 1 - index]);

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
      if (keyCode === 40 || keyCode === 38 || keyCode === 37 || keyCode === 39) {

        if (that.isSlide) that.addRandomNumber(1);
        const allFilled = this.board.filter((element) => element.numbers !== "");
        if (allFilled.length === this.board.length && this.gameOver()) console.log('game Over');

      }

    });


  },
  methods: {
    renderBoard() {
      let widthGrid = this.$refs.grid.clientWidth,
        widthPiece = (widthGrid + 20) / this.rowSize;

      for (let r = 0; r < this.size; r++) {
        let x = Math.floor(r / this.rowSize),
          y =  r - (Math.floor(r / this.rowSize) * this.rowSize);
        this.board.push({
          x: x,
          y: y,
          id: r,
          numbers: "",
          left: (widthPiece * y ),
          top: (widthPiece * x ),
        });

      }
    },
    addRandomNumber(number) {

      for (let i = 0; i < number; i++) {
        let boardMap = this.board.filter(element => element.numbers == "");
        let randomTile = boardMap[Math.floor(Math.random() * boardMap.length)],
          randomNumber = Math.random() < 0.9 ? 2 : 4;


        randomTile.numbers = randomNumber;




      }

    },
    slide(collumn) {
      var that = this;
      const getNumber = collumn.filter(item => item.numbers !== "");

      let getEmpty = "",
      newElement;
      for (let element of getNumber) {

        if (that.top) getEmpty = collumn.find(item => item.x < element.x && item.numbers == "");
        if (that.bottom) getEmpty = collumn.find(item => item.x > element.x && item.numbers == "");
        if (that.left) getEmpty = collumn.find(item => item.y < element.y && item.numbers == "");
        if (that.right) getEmpty = collumn.find(item => item.y > element.y && item.numbers == "");

        //const [firstIndex] = getEmpty;

        if (getEmpty) {
          newElement =  Object.assign({}, element);


        document.querySelectorAll('.piece')[element.id].style.transform = 'translate(' + getEmpty.left + 'px,' + getEmpty.top + 'px';



          element.x = getEmpty.x;
          element.y = getEmpty.y;
          element.left = getEmpty.left;
          element.top = getEmpty.top;
element.id = getEmpty.id;
getEmpty.id = newElement.id
          getEmpty.x = newElement.x;
          getEmpty.y = newElement.y;
          getEmpty.left = newElement.left;
          getEmpty.top = newElement.top;


          // firstIndex.numbers = element.numbers;
          // element = firstIndex;
          //           newElement.numbers = ""
          // firstIndex = newElement;






          // firstIndex.numbers = element.numbers;
          //
          //
          //
          //
          // element.numbers = "";

              document.querySelectorAll('.piece')[element.id].style.transform = 'translate(' + getEmpty.left + 'px,' + getEmpty.top + 'px';
          that.isSlide = true;
        }


      }

    },
    sumNumbers(row) {

      for (var i = 0; i < row.length - 1; i++) {
        let sum = row[i].numbers != "" && row[i + 1].numbers != "" ? row[i].numbers == row[i + 1].numbers : false;
        if (sum) {
          row[i].numbers += row[i + 1].numbers;
          this.scoreNumber = ~~row[i].numbers;
          this.scoreTotal += ~~row[i].numbers;

          row[i + 1].numbers = "";
          this.isSlide = true;
        }
      }
    },
    combine(collumn) {
      this.slide(collumn);
      this.sumNumbers(collumn);
      this.slide(collumn);
      //this.board.sort((a,b) => a.id - b.id)

      console.log(this.board);

    },
    newGame() {
      this.board = [];
      this.renderBoard();
      this.addRandomNumber(2);
      this.scoreTotal = 0;
    },
    gameOver() {
      for (var i = 0; i < this.rowSize; i++) {
        const collumn = this.board.filter(item => item.y == i);
        const reverseCollumn = collumn.map((item, index) => collumn[collumn.length - 1 - index]);
        const row = this.board.filter(item => item.x == i);
        const reverseRow = row.map((item, index) => row[row.length - 1 - index]);

        for (var j = 0; j < this.rowSize - 1; j++) {
          if (collumn[j].numbers == collumn[j + 1].numbers && collumn[j].numbers !== " ") this.isGameOver = false;
          if (row[j].numbers == row[j + 1].numbers && row[j].numbers != "") this.isGameOver = false;
          if (reverseCollumn[j].numbers == reverseCollumn[j + 1].numbers && reverseCollumn[j].numbers != "") this.isGameOver = false;
          if (reverseRow[j].numbers == reverseRow[j + 1].numbers && reverseRow[j].numbers != "") this.isGameOver = false;
        }


      }
    },
    // gameWon() {
    //   for (var i = 0; i < this.board.length; i++) {
    //     if (this.board[i].numbers === 2048) this.win = true;
    //   }
    //   return false;
    // }
  },
  computed:{
    getPosition(){

    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@mixin lg {
   @media screen and (max-width: 850px), screen and (max-height: 800px) {
      @content;
   }
}
@mixin md {
   @media screen and (max-width: 650px), screen and (max-height: 800px) {
      @content;
   }
}

@mixin sm {
   @media screen and (max-width: 500px), screen and (max-height: 700px) {
      @content;
   }
}
.game {
    position: relative;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255,255,255, 0.7);
    border-radius: 5px;

    @include sm {
         padding: 10px;
         }

    &__grid {
        width: 500px;
        height: 500px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        margin: 0;
        padding: 0;
        transition: all 1.5s ease;
        position: absolute;


    }

    &__board{
      width: 500px;
      height: 500px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      margin: 0;
      padding: 0;
      transition: all 1.5s ease;


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
        transition: 1.5s all ease;



    }


}
</style>
