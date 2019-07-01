<template>
<div class="game">
  <ul class="game__grid">
    <Piece v-for="(piece, index) in board" :key="index" :piece="piece" />
  </ul>
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
      numbers: [2, 4],
      moves: 0,
      getEmpty: "",
      bottom: false,
      top: false,
      left: false,
      right: false
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
      if (keyCode === 40 || keyCode === 38 || keyCode === 37 || keyCode === 39) this.addRandomNumber(1);


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
          randomNumber = this.numbers[Math.floor(Math.random() * this.numbers.length)];
        randomTile.numbers = randomNumber;
      }

    },
    slide(collumn) {
      var that = this;
      const getNumber = collumn.filter(item => item.numbers !== "");
      let getEmpty = "";
      for (let element of getNumber) {

        if (that.top) getEmpty = collumn.filter(item => item.x < element.x && item.numbers == "");
        if (that.bottom) getEmpty = collumn.filter(item => item.x > element.x && item.numbers == "");
        if (that.left) getEmpty = collumn.filter(item => item.y < element.y && item.numbers == "");
        if (that.right) getEmpty = collumn.filter(item => item.y > element.y && item.numbers == "");
        // change to < if want to go top
        const [firstIndex] = getEmpty; // descontruct array to get first index;
        if (getEmpty.length > 0) {
          firstIndex.numbers = element.numbers; //element to array index
          element.numbers = ""
        } else {

          continue
        }
      }


    },
    sumNumbers(row) {
      for (var i = 0; i < row.length - 1; i++) {
        if (row[i].numbers == row[i + 1].numbers) {
          row[i].numbers += row[i + 1].numbers
          row[i + 1].numbers = ""
        }
      }
    },
    combine(collumn) {
      this.slide(collumn);
      this.sumNumbers(collumn);
      this.slide(collumn);

    },
    // slideTop(){
    //   for (var i = 0; i < this.rowSize; i++) {
    //     const collumn = this.board.filter(item => item.y == i);
    //     const reverseCollumn = collumn.map((item,index) => collumn[collumn.length - 1 - index])
    //     this.slide(collumn);
    //     this.sumNumbers(collumn);
    //
    //   }
    //
    //   this.addRandomNumber(1);
    // },


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
