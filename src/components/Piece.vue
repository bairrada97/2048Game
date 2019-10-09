<template>
  <li
    :style="{width: `${pieceWidth}px`, height: `${pieceWidth}px`, transform: `translate(${tile.left}px, ${tile.top}px)`}"
    :class="{newTile: tile.new}"
    class="piece"
    :data-left=" tile.left"
    :data-top="tile.top"
    :data-number="tile.numbers"
  >
    <p
      :class="{sumPiece: tile.sumPiece}"
      :style="{color: number, background:addColor}"
    >{{tile.numbers}}</p>
  </li>
</template>

<script>
export default {
  name: "Piece",
  props: ["tile", "sumPiece", "pieceWidth"],
  data() {
    return {
      color: "",
      colors: {
        "2": {
          bgColor: "#ffe09d",
          color: "#eaa000",
          fontFamily: "Barlow"
        },
        "4": {
          bgColor: "#ecb562",
          color: "#faebd4",
          fontFamily: "Barlow"
        },
        "8": {
          bgColor: "#e89355",
          color: "#f7dac5",
          fontFamily: "Barlow"
        },
        "16": {
          bgColor: "#f1cec6",
          color: "#dd8874",
          fontFamily: "Barlow"
        },
        "32": {
          bgColor: "#eb8a7b",
          color: "#f8d9d4",
          fontFamily: "Barlow"
        },
        "64": {
          bgColor: "#d75c48",
          color: "#f2ccc6",
          fontFamily: "Barlow"
        },
        "128": {
          bgColor: "#bae3db",
          color: "#44a793",
          fontFamily: "Barlow Semi Condensed"
        },
        "256": {
          bgColor: "#81c7b8",
          color: "#36796b",
          fontFamily: "Barlow Semi Condensed"
        },
        "512": {
          bgColor: "#36857b",
          color: "#86cec5",
          fontFamily: "Barlow Semi Condensed"
        },
        "1024": {
          bgColor: "#d4ddea",
          color: "#6d8cb8",
          fontFamily: "Barlow Condensed"
        },
        "2048": {
          bgColor: "#acc3de",
          color: "#4574ac",
          fontFamily: "Barlow Condensed"
        },
        "4096": {
          bgColor: "#7084a1",
          color: "#ccd3de",
          fontFamily: "Barlow Condensed"
        },
        "8192": {
          bgColor: "#39537a",
          color: "#8da5ca",
          fontFamily: "Barlow Condensed"
        },
        more: {
          bgColor: "#69597a",
          color: "#c2b9cc",
          fontFamily: "Barlow Condensed"
        }
      }
    };
  },
  computed: {
    addColor() {
      if (this.tile.numbers != 0 && this.tile.numbers <= 2048) {
        let number = "" + this.tile.numbers;
        return this.colors[number].bgColor;
      } else if (this.tile.numbers > 2048) {
        return this.colors["more"].bgColor;
      }
    },
    number() {
      if (this.tile.numbers != 0 && this.tile.numbers <= 2048) {
        let number = "" + this.tile.numbers;
        return this.colors[number].color;
      } else if (this.tile.numbers > 2048) {
        return this.colors["more"].color;
      }
    },
    changeFont() {
      let number = "" + this.tile.numbers;
      if (number) {
        return this.colors[number].fontFamily;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@import "@/styles/layout.scss";

.piece {
  max-width: 110px;
  max-height: 110px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  text-align: center;
  transition: all 100ms ease-in-out;

  &.newTile {
    p {
      animation: scale 0.4s ease;
    }
  }

  p {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 45px;
    position: absolute;
    color: white;
    z-index: 1;
    text-align: center;

    @include md {
      font-size: 28px;
    }

    @include sm {
      font-size: 22px;
    }

    &.sumPiece {
      animation: scale2 0.75s ease;
    }
  }

  @keyframes sumPiece {
    0% {
      transform: rotate(-5deg);
    }

    50% {
      transform: rotate(5deg);
    }

    100% {
      transform: rotate(0);
    }
  }

  @keyframes scale {
    0% {
      transform: scale(0);
    }

    80% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes scale2 {
    0% {
      transform: scale(1);
    }

    80% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }
  }
}
</style>
