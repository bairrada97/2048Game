<template>
<li :style="{color: ze}" class="item" :data-x="piece.x" :data-y="piece.y">{{piece.numbers}}</li>
</div>

</div>
</template>

<script>
export default {
  name: 'Piece',
  props: ['piece'],
  data() {
    return {


    }
  },



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.item {
    width: 120px;
    height: 120px;
    background: rgba(238, 228, 218, 0.73);
    border: 2px solid black;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
}
</style>
