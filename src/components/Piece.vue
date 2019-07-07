<template>

  <p :style="{background: addColor, transform: `translate(${piece.left}px, ${piece.top}px)`}" class="piece" :data-x="piece.x" :data-y="piece.y" :data-left=" piece.left" :data-top="piece.top" :data-number="piece.numbers">{{piece.numbers}}</p>

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
      colors: {
        "2": {
          bgColor: "#ffe09d",
          color: "darken(#ffe09d, 35%)"
        },
        "4": {
          bgColor: "#ecb562",
          color: "lighten(#ecb562, 25%)"
        },
        "8": {
          bgColor: "#e89355",
          color: "lighten(#ecb562, 25%)"
        },
        "16": {
          bgColor: "#f1cec6",
          color: "darken(#f1cec6, 20%)"
        },
        "32": {
          bgColor: "#eb8a7b",
          color: "lighten(#eb8a7b, 20%)"
        },
        "64": {
          bgColor: "#d75c48",
          color: "lighten(#d75c48, 30%)"
        },
        "128": {
          bgColor: "#bae3db",
          color: "darken(#bae3db, 35%)"
        },
        "256": {
          bgColor: "#81c7b8",
          color: "darken(#81c7b8, 30%)"
        },
        "512": {
          bgColor: "#36857b",
          color: "lighten(#36857b, 30%)"
        },
        "1024": {
          bgColor: "#d4ddea",
          color: "darken(#d4ddea, 30%)"
        },
        "2048": {
          bgColor: "#acc3de",
          color: "lighten(#acc3de, 30%)"
        },
        "4096": {
          bgColor: "#7084a1",
          color: "lighten(#7084a1, 30%)"
        },
        "8192": {
          bgColor: "#39537a",
          color: "lighten(#39537a, 32%)"
        },
        "more": {
          bgColor: "#69597a",
          color: "lighten(#69597a, 35%)"
        }
      }

    }
  },
  computed: {
    addColor() {
      if (this.piece.numbers != 0 && this.piece.numbers <= 2048) {
        let number = "" + this.piece.numbers;
        return this.colors[number].bgColor;
      } else if (this.piece.numbers > 2048) {
        return this.colors["more"].bgColor;
      }
    },

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


.piece {
    width: 100%;
    height: 100%;
    max-width: 110px;
    max-height: 110px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 45px;
    position: absolute;
    z-index: 1;
    transition: 1.5s all ease;

    @include md {
        font-size: 28px;
    }

    @include sm {
        font-size: 22px;
    }
}
</style>
