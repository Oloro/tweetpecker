<template>
  <div class="p-2 bg-white border rounded-full">
    <i class="align-middle md-inactive material-icons">search</i>
    <input
      id="tweet_url"
      :value="inputValue"
      type="url"
      name="tweet_rul"
      :placeholder="searchPlaceholder"
      class="w-9/12 ml-2 text-gray-900 align-middle outline-none lg:w-9/12 xl:w-10/12"
      @input="inputValue = $event.target.value"
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

const SearchBarProped = Vue.extend({
  components: {
    'app-loader': Loader
  },
  model: {
    prop: 'inputProp',
    event: 'change'
  },
  props: {
    inputProp: {
      type: String,
      required: true,
      default: ''
    }
  }
});

@Component
export default class SearchBar extends SearchBarProped {
  get inputValue() {
    return this.inputProp;
  }

  set inputValue(value) {
    this.$emit('change', value);
  }

  searchPlaceholder = 'Twitter url...';
  @Prop({ required: true, type: Boolean }) loadingStatus!: boolean;
}
</script>

<style scoped></style>
