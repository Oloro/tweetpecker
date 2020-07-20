<template>
  <div>
    <slot></slot>
    <select class="p-2 ml-2 rounded-full" @change="change">
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option === value"
        >{{ option }}</option
      ></select
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  model: {
    prop: 'value',
    event: 'change'
  }
})
export default class Dropdown extends Vue {
  @Prop({ required: true, type: Array }) options?: string[];
  @Prop({ type: String }) value?: string[];

  change(event: Event) {
    this.$emit('change', (event.target as HTMLSelectElement).value);
  }
}
</script>

<style scoped>
select::after {
  margin-right: 10px;
}
</style>
