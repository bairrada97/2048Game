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
    addRandomNumber(nr) {

      for (let i = 0; i < nr; i++) {
        let boardMap = this.board.filter(elm => elm.numbers == "" );
        let randomTile = boardMap[Math.floor(Math.random() * boardMap.length)],
          randomNumber = this.numbers[Math.floor(Math.random() * this.numbers.length)];

          randomTile.numbers = randomNumber;

      }


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
