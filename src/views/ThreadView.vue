<template>
  <div class="w-1/2 h-full mx-auto overflow-auto">
    <div v-for="post in posts" :key="post.idStr">
      {{ post.fullText }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState({
      posts: 'threadData'
    })
  }
})
export default class ThreadView extends Vue {}
</script>

<style scoped></style>
