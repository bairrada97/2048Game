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
      if (keyCode === 32) {
        this.slide();
        this.sumNumbers();
        this.slide();
        this.addRandomNumber(1);
      }

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
    slide(index) {
      let hasNumbers = this.board.filter(element => element.numbers != "");
      const reverse  = hasNumbers.map((val, index) => hasNumbers[hasNumbers.length - 1 - index]); // reverse array, element on for each will be the last element on Collumn;

      for(let element of reverse){

        const getEmpty = this.board.filter((item) => {
          return item.x > element.x && item.y == element.y && item.numbers == "";  // get array of empty piece on Collumn
        });

        if(getEmpty.length > 0){
          getEmpty[getEmpty.length - 1].numbers = element.numbers; //element to array index
          element.numbers = ""
        }else{

          continue
        }

      }

    },
    sumNumbers(){
      for (let element of this.board) {
        const getPieceNumber = this.board.filter((item) => {
          return item.x > element.x && item.y == element.y && item.numbers != "";  // get array of empty piece on Collumn
        });

        if(getPieceNumber.length > 0){
          if(getPieceNumber[getPieceNumber.length - 1].numbers ==  element.numbers){
            getPieceNumber[getPieceNumber.length - 1].numbers += element.numbers;
            element.numbers = ""
          }else{
            continue
          }
        }
      }

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
