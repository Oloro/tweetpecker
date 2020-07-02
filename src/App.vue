<template>
  <div id="app" class="font-sans">
    <app-main></app-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Main from './views/Main.vue';

@Component({
  components: {
    'app-main': Main
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
