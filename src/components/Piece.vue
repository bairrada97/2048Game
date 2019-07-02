<template>
<li :style="{background: addColor}"  class="item" :data-x="piece.x" :data-y="piece.y">{{piece.numbers}}</li>
</div>

</div>
</template>

<script>
export default {
  name: 'Piece',
  props: ['piece'],
  data() {
    return {
      color: "",
      colors:{
        "2":{
          color: "#f03232"
        },
        "4":{
          color: "#d28787"
        },
        "8":{
          color: "#86882a"
        },
        "16":{
          color: "#ffd093"
        },
        "32":{
          color: "#3f42bb"
        },
        "64":{
          color: "#2ea0d8"
        },
        "128":{
          color: "#2ed86b"
        },
        "256":{
          color: "#3a2e13"
        },
        "512":{
          color: "#520505"
        },
        "1024":{
          color: "#0c72a5"
        },
        "2048":{
          color: "#072331"
        },
        "more":{
          color: "#000000"
        }
      }

    }
  },
  computed: {
    addColor(){
      if(this.piece.numbers != 0 && this.piece.numbers <= 2048){
        let number = "" + this.piece.numbers;
        return this.colors[number].color;
      }else if(this.piece.numbers > 2048){
        return this.colors["more"].color
      }


    }
  }

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
    color: white;
}
</style>
