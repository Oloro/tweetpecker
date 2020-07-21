<template>
  <div class="bg-blue-200">
    <img
      src="../assets/Logo.svg"
      class="absolute w-24 ml-4 -mt-2 duration-100 transition-width md:w-48 md:-mt-6"
      alt=""
    />
    <span
      class="absolute mt-20 ml-8 font-mono text-gray-600 md:mt-40 md:ml-16 text-md md:text-xl"
      >ALPHA</span
    >
    <app-search-view
      v-if="!$store.state.isThreadLoaded"
      class="h-screen"
    ></app-search-view>
    <app-thread-view v-else></app-thread-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchView from './SearchView.vue';
import ThreadView from './ThreadView.vue';

@Component({
  components: {
    'app-search-view': SearchView,
    'app-thread-view': ThreadView
  }
})
export default class Main extends Vue {}
</script>

<style scoped></style>
