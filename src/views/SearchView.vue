<template>
  <div class="flex">
    <div class="w-1/12 md:w-2/6"></div>
    <div
      id="anime-stagger-container"
      class="w-10/12 mt-32 md:w-3/6 lg:w-2/6 md:mt-64"
    >
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
        :loading-status="isThreadLoading"
        class="my-2"
        @change="updateInput"
      ></app-search-bar>
      <h2 class="font-semibold text-gray-800 text-l">
        ...to sort, <s>filter</s> (soon!) and <s>pick</s> (soon!) what's
        actually important for you.
      </h2>
      <div>
        <app-shake>
          <app-alert v-if="alert.isVisible" :type="alert.type" class="my-2">{{
            alert.message
          }}</app-alert>
        </app-shake>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchBar from '../components/subcomponents/SearchBar.vue';
import Shake from '../components/subcomponents/utils/Shake.vue';
import anime from 'animejs';
import { AxiosResponse } from 'axios';

@Component({
  components: {
    'app-search-bar': SearchBar,
    'app-shake': Shake
  }
})
export default class SearchView extends Vue {
  isThreadLoading = false;
  searchInput = '';
  get isSearchValid(): boolean {
    if (this.searchInput === '') {
      this.clearAlert();
      return false;
    }
    if (!this.isValidTweetUrl(this.searchInput)) {
      this.setAlert('warning', 'This is not a valid tweet link.');
      return false;
    } else {
      this.clearAlert();
      return true;
    }
  }

  isValidTweetUrl(url: string): boolean {
    return /^(?:https?:\/\/)*twitter.com\/\w+\/status\/\d+$/.test(url);
  }

  isValidThread(thread: AxiosResponse): boolean {
    if (thread.status === 200) {
      this.clearAlert();
      return true;
    } else {
      this.setAlert('error', thread.data.message);
      return false;
    }
  }

  updateInput(inputValue: string) {
    this.searchInput = inputValue;
    this.fetchThread();
  }

  async fetchThread(): Promise<boolean> {
    this.isThreadLoading = true;
    if (!this.isSearchValid) {
      this.isThreadLoading = false;
      return false;
    }
    const thread = await this.axios.get(
      `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/tweet`,
      {
        params: {
          url: this.searchInput,
          count: 500
        },
        validateStatus: () => true
      }
    );
    if (!this.isValidThread(thread)) {
      console.log('nieprawidłowy, kasować');
      this.searchInput = '';
      this.isThreadLoading = false;
      return Promise.resolve(false);
    }
    this.$store.dispatch('setThreadUrl', this.searchInput);
    this.$store.dispatch('setThreadData', thread.data.posts);
    this.$store.dispatch('setIsThreadLoaded', true);
    this.isThreadLoading = false;
    return Promise.resolve(true);
  }

  alert: {
    isVisible: boolean;
    type: 'info' | 'warning' | 'error';
    message: string;
  } = {
    isVisible: false,
    type: 'info',
    message: ''
  };

  setAlert(type: 'info' | 'warning' | 'error', message: string): void {
    this.alert.type = type;
    this.alert.message = message;
    this.alert.isVisible = true;
  }

  clearAlert() {
    this.alert.isVisible = false;
    this.alert.message = '';
  }

  mounted() {
    const elementsToStagger = document
      .getElementById('anime-stagger-container')! // forbidden non-null assertion?
      .querySelectorAll('h1, h2, div');

    elementsToStagger.forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(-20)';
    });
    anime({
      targets: elementsToStagger,
      translateY: 20,
      opacity: 1,
      duration: 1000,
      delay: anime.stagger(20, { start: 300 })
    });
  }
}
</script>

<style scoped></style>
