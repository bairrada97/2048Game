<template>
  <button aria-label="newGame" class="btn">
    <span></span>
    <p data-title="new game" data-text="start!" data-start="good luck!"></p>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["btnText"],
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@import "@/styles/layout.scss";

.btn {
  width: 120px;
  height: 40px;
  background-color: white;
  margin: 20px 0 20px 20px;
  color: $c-02;
  position: relative;
  overflow: hidden;
  font-size: 12px;
  letter-spacing: 0.5px;
  font-weight: 500;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  grid-area: 2/3/1/3;
  justify-self: flex-end;
  pointer-events: all;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background-color: $c-03;
    transition: all 0.3s cubic-bezier(0.35, 0.1, 0.25, 1);
  }

  &:before {
    right: 0;
    top: 0;
    transition: all 0.5s cubic-bezier(0.35, 0.1, 0.25, 1);
  }

  &:after {
    left: 0;
    bottom: 0;
  }

  span {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    z-index: 1;

    &:before,
    &:after {
      content: "";
      position: absolute;
      width: 2px;
      height: 0;
      background-color: $c-03;
      transition: all 0.3s cubic-bezier(0.35, 0.1, 0.25, 1);
    }

    &:before {
      right: 0;
      top: 0;
      transition: all 0.5s cubic-bezier(0.35, 0.1, 0.25, 1);
    }

    &:after {
      left: 0;
      bottom: 0;
    }
  }

  p {
    padding: 0;
    margin: 0;
    transition: all 0.4s cubic-bezier(0.35, 0.1, 0.25, 1);
    position: absolute;
    width: 100%;
    height: 100%;

    &:before,
    &:after {
      position: absolute;
      width: 100%;
      transition: all 0.4s cubic-bezier(0.35, 0.1, 0.25, 1);
      z-index: 1;
      left: 0;
    }

    &:before {
      content: attr(data-title);
      top: 50%;
      transform: translateY(-50%);
    }

    &:after {
      content: attr(data-text);
      top: 150%;
      color: $c-03;
    }
  }

  &:hover {
    &:before,
    &:after {
      width: 100%;

      @include md {
        width: 0;
      }
    }

    span {
      z-index: 1;
      &:before,
      &:after {
        height: 100%;

        @include md {
          height: 0;
        }
      }
    }

    p {
      &:before {
        top: -50%;
        transform: rotate(5deg);

        @include md {
          top: 50%;
          transform: rotate(0deg) translateY(-50%);
        }
      }

      &:after {
        top: 50%;
        transform: translateY(-50%);

        @include md {
          content: none;
        }
      }
    }

    
  }

  &.start {
    background-color: $c-03;
    box-shadow: 0px 5px 10px -10px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;

    p {
      &:before {
        top: -50%;
        transform: rotate(5deg);
      }
      &:after {
        color: white;
        transition: all 0s ease;
        content: attr(data-start);
        top: 50%;
        transform: translateY(-50%);
        animation: start 0.3s ease;
        animation-fill-mode: forwards;

        @keyframes start {
          from {
            top: -50%;
          }
        }
      }
    }

    &:hover {
      &:before,
      &:after {
        display: none;
      }
      span {
        display: none;
      }
    }
  }
}

.alternate{
  display: block;
  color: $c-02;
  font-size: 12px;
  letter-spacing: 0.5px;
  font-weight: 500;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 0;
  border-radius: 3px;
  pointer-events: all;
  width: auto;
  min-width: 100px;
  height: 30px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid $c-02;
  box-shadow: inset 0 0 0 $c-02;
  margin: 0 auto;
  z-index: 2;
  transition: all 0.3s  ease ;

  &:hover{
    color: #fff;
    box-shadow: inset 0 -30px 0 $c-02; 
  }
}

button:active {
  outline: none;
  border: none;
}
button:focus {
  outline: 0;
}
</style>
