<template>
  <div class="h-screen p-4 bg-blue-200">
    <img
      src="../assets/logo.png"
      class="absolute w-12 duration-100 transition-width md:w-20"
      alt=""
    />
    <app-search-view v-if="!$store.state.isTweetLoaded"></app-search-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchView from './SearchView.vue';

@Component({
  components: {
    'app-search-view': SearchView
  }
})
export default class Main extends Vue {}
</script>

<style scoped></style>
