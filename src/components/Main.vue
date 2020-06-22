<template>
  <div class="h-screen bg-blue-200">
    <app-bar></app-bar>
    <div class="flex justify-center w-full">
      <p class="self-center text-gray-600">Search for a tweet...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppBar from './AppBar.vue';

@Component({
  components: {
    'app-bar': AppBar
  }
})
export default class Main extends Vue {
  isTweetLoaded = false;
}
</script>

<style scoped></style>
