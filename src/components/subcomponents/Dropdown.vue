<template>
  <div>
    <select @change="change">
      <option v-for="option in options" :key="option" :value="option">{{
        option
      }}</option></select
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Dropdown extends Vue {
  @Prop({ required: true, type: Array }) options?: string[];

  change(event: Event) {
    this.$emit('change', (event.target as HTMLSelectElement).value);
  }
}
</script>

<style scoped></style>
