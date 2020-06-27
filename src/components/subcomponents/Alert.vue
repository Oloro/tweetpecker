<template>
  <div :class="type" class="p-2 rounded-full">
    <i class="mx-2 align-middle material-icons">{{ type }}</i>
    <div class="inline text-gray-300 align-middle"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Alert extends Vue {
  @Prop({ required: true, type: String }) readonly type!: string;
}
</script>

<style scoped>
.info {
  @apply bg-blue-400;
}
.warning {
  @apply bg-orange-400;
}
.error {
  @apply bg-red-500;
}
.material-icons {
  color: rgba(255, 255, 255, 0.8);
}
</style>
