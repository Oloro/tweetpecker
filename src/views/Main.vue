<template>
  <div class="bg-blue-200">
    <img
      src="../assets/logo.png"
      class="absolute w-12 mt-4 ml-4 duration-100 transition-width md:w-20"
      alt=""
    />
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
