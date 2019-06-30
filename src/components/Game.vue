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
      moves: 0
    }

  },
  mounted() {
    this.renderBoard();
    this.addRandomNumber(2);
    window.addEventListener('keypress', ({
      keyCode
    }) => {

      if (keyCode === 32) this.slideBottom();

    });
  },
  methods: {
    isInBounds(target) {
      if (target != undefined) {
        return (target.x >= 0 && target.x <= this.board.length - 1) && (target.y >= 0 && target.y <= this.board.length - 1)
      } else {
        return false
      }

    },
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

      const getNumber = collumn.filter(item => item.numbers !== "");

      for (let element of getNumber) {
        const getEmpty = collumn.filter(item => item.x > element.x  && item.numbers == ""); // change to < if want to go top
        const [firstIndex] = getEmpty; // descontruct array to get first index;
        if(getEmpty.length > 0){
          firstIndex.numbers = element.numbers; //element to array index
          element.numbers = ""
        }else{

          continue
        }
      }


    },
    sumNumbersTop(row){



      for (var i = 0; i < row.length - 1; i++) {
        if(row[i].numbers == row[i + 1].numbers){
          row[i].numbers  += row[i + 1].numbers
          row[i + 1].numbers = ""
        }
      }



    },
    sumNumbersBottom(row){
      for (var i = row.length - 1; i > 0; i--) {
        if(row[i].numbers == row[i - 1].numbers){
          row[i].numbers  += row[i - 1].numbers
          row[i - 1].numbers = ""
        }
      }
    },
    slideBottom(){
      for (var i = 0; i < this.rowSize; i++) {
        const collumn = this.board.filter(item => item.y == i);
        const reverseCollumn = collumn.map((item,index) => collumn[collumn.length - 1 - index])
        this.slide(reverseCollumn);
        this.sumNumbersBottom(collumn);

      }

      this.addRandomNumber(1);
    },
    slideTop(){
      for (var i = 0; i < this.rowSize; i++) {
        const collumn = this.board.filter(item => item.y == i);
        const reverseCollumn = collumn.map((item,index) => collumn[collumn.length - 1 - index])
        this.slide(collumn);
        this.sumNumbersTop(collumn);

      }

      this.addRandomNumber(1);
    },


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
