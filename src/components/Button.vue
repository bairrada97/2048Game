<template>
<button class="btn" type="button" name="button"> <span></span><p data-title="new game" data-text="start!" data-start="good luck!"></p></button>
</template>

<script>
export default {
  name: 'Button',
  props: ['btnText'],
  data() {
    return {


    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
$bg-01: #fdf5f0;
/*game*/
$c-02: #7084a1;
/*txt*/
$c-03: #81c7b8;
/*success*/

.btn {
    width: 130px;
    height: 42px;
    background-color: $bg-01;
    color: $c-02;
    position: relative;
    overflow: hidden;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    font-family: "Barlow", sans-serif;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;

    &:after,
    &:before {
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

        &:after,
        &:before {
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

        &:after,
        &:before {
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
        &:after,
        &:before {
            width: 100%;
        }

        span {
            z-index: 1;
            &:after,
            &:before {
                height: 100%;
            }
        }

        p {
            &:before {
                top: -50%;
                transform: rotate(5deg);
            }

            &:after {
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

    &.start {
        background-color: $c-03;
        box-shadow: 0 5px 10px -10px rgba(0, 0, 0, 0.2);
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
            &:after,
            &:before {
                display: none;
            }
            span {
                display: none;
            }
        }
    }

    &:active {
        outline: none;
        border: none;
    }
    &:focus {
        outline: 0;
    }
}
</style>
