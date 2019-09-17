<template>
<div class="score">
  <h2 class="scoreTitle">Score:</h2>
  <div class="scoreContainer">
    <p class="scoreTotal">{{scoreTotal}}</p>
    <span v-show="scoreAnimation" class="scorePartial">+{{scoreNumber}}</span>
  </div>

</div>
</template>

<script>
export default {
  name: 'Score',
  props: ['scoreTotal', 'scoreNumber', 'highScore', 'scoreAnimation'],
  data() {
    return {


    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
$c-02: #7084a1;


@mixin lg {
   @media screen and (max-width: 850px) {
      @content;
   }
}
@mixin md {
   @media screen and (max-width: 650px),  screen and  (max-height: 800px) {
      @content;
   }
}

@mixin sm {
   @media screen and (max-width: 500px), screen and  (max-height: 660px) {
      @content;
   }
}

.score {
    position: relative;


}

.scoreContainer {
    display: flex;
    align-items: center;
}

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

    @include md{
     font-size: 22px;
    }

}

.scorePartial {
    color: $c-02;
    font-size: 20px;
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 500;
    animation: scorePartial 0.4s ease forwards;
    margin-left: 10px;
    letter-spacing: 2px;

    @include md{
     font-size: 18px;
    }

}

@keyframes scorePartial {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }

    50% {
        opacity: 1;

    }

    100% {
        transform: translateY(-5px);
        opacity: 0;
    }
}
</style>
