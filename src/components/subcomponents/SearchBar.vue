<template>
  <div class="p-2 bg-white border rounded-full">
    <i class="align-middle md-inactive material-icons">search</i>
    <input
      id="tweet_url"
      v-model="inputValue"
      type="url"
      name="tweet_rul"
      :placeholder="searchPlaceholder"
      class="w-10/12 ml-2 text-gray-900 align-middle outline-none lg:w-11/12"
      @input="$emit('change', inputValue)"
      @focus="searchPlaceholder = ''"
      @blur="searchPlaceholder = 'Twitter url...'"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const SearchBarProped = Vue.extend({
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
  inputValue = this.inputProp;
  searchPlaceholder = 'Twitter url...';
}
</script>

<style scoped></style>