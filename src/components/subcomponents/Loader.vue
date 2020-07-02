<template>
  <div class="loader"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {}
</script>

<style scoped>
.loader {
  border-top: 16px solid #2a4365;
  border-right: 16px solid #2b6cb0;
  border-bottom: 16px solid #4299e1;
  border-left: 16px solid #90cdf4;
  animation: spin 2s linear infinite;
  @apply rounded-full;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
