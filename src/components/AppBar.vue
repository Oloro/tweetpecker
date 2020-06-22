<template>
  <div
    class="grid w-full h-16 grid-cols-12 gap-4 bg-gray-100 border-b border-gray-400 border-solid"
  >
    <img
      class="self-center col-span-1 mx-auto"
      width="30"
      src="../assets/logo.png"
      alt=""
    />
    <app-search-bar class="self-center col-span-10"></app-search-bar>
    <app-btn class="self-center mr-4">Load</app-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchBar from './controls/SearchBar.vue';

@Component({
  components: {
    'app-search-bar': SearchBar
  }
})
export default class AppBar extends Vue {}
</script>

<style scoped></style>
