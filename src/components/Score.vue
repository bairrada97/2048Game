<template>
  <div class="score">
    <h2 class="scoreTitle">Your Score:</h2>
    <p class="scoreTotal">{{scoreTotal}}</p>
    <span>+{{scoreNumber}}</span>
  </div>
</template>

<script>
export default {
  name: 'Score',
  props: ['scoreTotal', 'scoreNumber'],
  data() {
    return {


    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">


$c-02: #7084a1;


.scoreTitle {
   color: $c-02;
   font-size: 12px;
   text-transform: uppercase;
   font-weight: 500;
   letter-spacing: 1px;
}

.scoreTotal {
   font-weight: 500;
   font-size: 30px;
   font-family: "Barlow Condensed", sans-serif;
   color: $c-02;
   letter-spacing: 2px;
}

</style>
