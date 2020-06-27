<template>
  <transition @before-enter="beforeEnter" @enter="enter"
    ><slot></slot
  ></transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import anime from 'animejs';

@Component
export default class Shake extends Vue {
  @Prop({ default: '350', type: Number }) duration!: number;
  @Prop({ default: '0', type: Number }) delay!: number;

  beforeEnter(el: HTMLElement) {
    el.style.opacity = '0';
  }

  enter(el: HTMLElement, done: any) {
    anime({
      targets: el,
      keyframes: [
        { translateX: -10 },
        { translateX: 18 },
        { translateX: -13 },
        { translateX: 7 },
        { translateX: -3 }
      ],
      easing: 'cubicBezier(.5, .05, .1, .3)',
      opacity: {
        value: 1,
        duration: this.duration / 3
      },
      duration: this.duration,
      delay: this.delay
    });
    done();
  }
}
</script>

<style scoped>
.shake-enter {
  opacity: 0;
}
.shake-enter-active {
  transition: opacity 2s;
}
</style>
