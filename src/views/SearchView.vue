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
        :auto-fetch="true"
        class="my-2"
        @error="setAlert"
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

@Component({
  components: {
    'app-search-bar': SearchBar,
    'app-shake': Shake
  }
})
export default class SearchView extends Vue {
  alert: {
    isVisible: boolean;
    type: 'info' | 'warning' | 'error' | 'noError';
    message: string;
  } = {
    isVisible: false,
    type: 'info',
    message: ''
  };

  setAlert(
    type: 'info' | 'warning' | 'error' | 'noError',
    message: string
  ): void {
    if (type === 'noError') this.clearAlert();
    else {
      this.alert.type = type;
      this.alert.message = message;
      this.alert.isVisible = true;
    }
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
