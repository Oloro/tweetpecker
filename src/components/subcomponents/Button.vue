<template>
  <div
    class="flex justify-center p-2 bg-blue-400 rounded-full cursor-pointer hover:bg-blue-300"
  >
    <p class="self-center font-semibold text-white cursor-pointer">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {}
</script>

<style scoped></style>
