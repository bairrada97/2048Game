<template>

  <div class="gameOver" :class="{gameOver__active: isGameOver}">
    <p class="text">Game over!</p>
    <Button @click.native="newGame" :btnText="text" />
  </div>

</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'GameOver',
  components: {
    Button
  },
  props: ['newGame', 'text', 'isGameOver'],
  data() {
    return {


    }
  },

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
$bg-01: #fdf5f0;
$c-01: #f9d1c0;
$c-02: #7084a1;
$c-03: #81c7b8;

.gameOver {
    position: absolute;
    width: 50%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1;
    transition: all 1s ease;
        opacity: 0;

    &:after,
    &:before {
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        content: "";
        position: absolute;
        border-radius: 100%;
        transition: all 0.4s ease;
        display: flex;

    }
    &:before {
        background-color: white;
        opacity: 0.8;
    }
    &:after {
        background-color: $c-01;
        opacity: 0.5;
    }

    .text {
        z-index: 1;
        text-align: center;
        color: $c-02;
        font-weight: 500;
        transition: all 0.6s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        letter-spacing: 3px;
        font-size: 30px;
        opacity: 0;
    }

    p {
        margin-bottom: 40px;
    }

    .btn {
        transform: translateY(20px);
        transition: all 0.6s ease;
        z-index: 1;
    }



}


</style>
