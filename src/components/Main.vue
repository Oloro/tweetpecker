<template>
  <div class="h-screen p-4 bg-blue-200">
    <img
      src="../assets/logo.png"
      class="absolute w-12 duration-100 transition-width md:w-20"
      alt=""
    />
    <div class="flex">
      <div class="w-1/12 md:w-2/6"></div>
      <div class="w-10/12 mt-32 md:w-3/6 lg:w-2/6 md:mt-64">
        <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">
          Read the <span class="text-blue-600">tweet</span>
        </h1>
        <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">
          however you want.
        </h1>
        <h2 class="mt-4 text-xl font-semibold text-gray-800">
          Paste the tweet link...
        </h2>
        <app-search-bar class="mt-2"></app-search-bar>
        <app-btn class="w-full mt-4 md:w-3/12">Load</app-btn>
      </div>
    </div>
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
export default class Main extends Vue {
  isTweetLoaded = false;
}
</script>

<style scoped></style>
