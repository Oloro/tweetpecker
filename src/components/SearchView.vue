<template>
  <div class="flex">
    <div class="w-1/12 md:w-2/6"></div>
    <div class="w-10/12 mt-32 md:w-3/6 lg:w-2/6 md:mt-64">
      <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">
        Read the <span class="text-blue-600">twitter</span> thread
      </h1>
      <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">
        however you want.
      </h1>
      <h2 class="mt-4 font-semibold text-gray-800 text-l">
        Paste the tweet link...
      </h2>
      <app-search-bar
        v-model="searchInput"
        class="mt-2"
        @change="fetchThread"
      ></app-search-bar>
      <!-- <app-btn class="w-full mt-4 md:w-3/12">Load</app-btn> -->
      <h2 class="mt-4 font-semibold text-gray-800 text-l">
        ...to sort, <s>filter</s> (soon!) and <s>pick</s> (soon!) what's
        actually important for you.
      </h2>
      <app-shake>
        <app-alert v-if="alert.isVisible" :type="alert.type" class="my-2">{{
          alert.message
        }}</app-alert>
      </app-shake>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchBar from './subcomponents/SearchBar.vue';
import Shake from './subcomponents/utils/Shake.vue';

@Component({
  components: {
    'app-search-bar': SearchBar,
    'app-shake': Shake
  }
})
export default class SearchView extends Vue {
  searchInput = '';
  validateSearch(): boolean {
    if (this.searchInput) {
      if (!this.isValidTweetUrl(this.searchInput)) {
        this.alert.type = 'error';
        this.alert.message = 'This is not a valid tweet link.';
        this.alert.isVisible = true;
        return false;
      } else {
        this.alert.isVisible = false;
        return true;
      }
    } else {
      this.alert.isVisible = false;
      return false;
    }
  }
  isValidTweetUrl(url: string): boolean {
    return /^(?:https:\/\/)*twitter.com\/\w+\/status\/\d+$/g.test(url);
  }

  async fetchThread(): Promise<boolean> {
    if (!this.validateSearch()) return false;
    const thread = await this.axios.get(
      `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/tweet`,
      {
        params: {
          url: this.searchInput,
          count: 50
        }
      }
    );
    console.log(thread.data);
    return Promise.resolve(true);
  }

  alert: { isVisible: boolean; type: string; message: string } = {
    isVisible: false,
    type: '',
    message: ''
  };
}
</script>

<style scoped></style>
