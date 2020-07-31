<template>
  <div class="p-2 bg-white border rounded-full">
    <i class="align-middle md-inactive material-icons">search</i>
    <input
      id="tweet_url"
      type="url"
      name="tweet_rul"
      :value="searchInput"
      :placeholder="searchPlaceholder"
      class="w-9/12 ml-2 text-gray-900 align-middle outline-none lg:w-9/12 xl:w-10/12"
      @input="inputChanged"
      @focus="searchPlaceholder = ''"
      @blur="searchPlaceholder = 'Twitter url...'"
    />
    <app-loader
      v-if="loadingStatus"
      class="inline-block float-right w-8 h-8 align-middle"
      style="margin-top: -3px;"
    ></app-loader>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Loader from './Loader.vue';
import { AxiosResponse } from 'axios';

const SearchBarProped = Vue.extend({
  components: {
    'app-loader': Loader
  }
});

@Component
export default class SearchBar extends SearchBarProped {
  @Prop({ default: '', type: String }) value?: string;
  @Prop({ default: false, type: Boolean }) autoFetch?: boolean;
  searchInput = '';
  searchPlaceholder = 'Twitter url...';
  loadingStatus = false;

  isSearchValid(): boolean {
    if (this.searchInput === '') {
      this.$emit('error', 'noError', '');
      return false;
    }
    if (!this.isValidTweetUrl(this.searchInput)) {
      this.$emit('error', 'warning', 'This is not a valid tweet link.');
      return false;
    } else {
      this.$emit('error', 'noError', '');
      return true;
    }
  }

  isValidTweetUrl(url: string): boolean {
    return /^(?:https?:\/\/)*(?:mobile.)*twitter.com\/\w+\/status\/\d+$/.test(
      url
    );
  }

  isValidThread(thread: AxiosResponse): boolean {
    if (thread.status === 200) {
      this.$emit('error', 'noError', '');
      return true;
    } else {
      this.$emit('error', 'error', thread.data.message);
      return false;
    }
  }

  async fetchThread(): Promise<boolean> {
    this.loadingStatus = true;
    if (!this.isSearchValid()) {
      this.loadingStatus = false;
      return false;
    }
    let thread;
    try {
      thread = await this.axios.get(
        `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/tweet`,
        {
          timeout: 15000,
          params: {
            url: this.searchInput,
            count: 500
          },
          validateStatus: () => true
        }
      );
      if (!this.isValidThread(thread)) {
        this.searchInput = '';
        this.loadingStatus = false;
        return Promise.resolve(false);
      }
      this.$store.dispatch('setThreadUrl', this.searchInput);
      this.$store.dispatch('setThreadData', thread.data.data);
      this.$store.dispatch('setIsThreadLoaded', true);
      this.loadingStatus = false;
      return Promise.resolve(true);
    } catch (error) {
      this.$emit('error', 'error', 'Oops! Something went wrong. Try later!');
      this.searchInput = '';
      this.loadingStatus = false;
      return Promise.resolve(false);
    }
  }

  inputChanged(event: Event) {
    this.searchInput = (event.currentTarget as HTMLInputElement).value || '';
    this.autoFetch ? this.fetchThread() : null;
  }

  created() {
    this.searchInput = this.value || '';
  }
}
</script>

<style scoped></style>
