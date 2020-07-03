<template>
  <div class="w-11/12 h-full mx-auto overflow-auto md:w-4/5 lg:w-2/3 xl:w-1/2">
    <div v-for="post in posts" :key="post.idStr">
      <div class="p-2 m-2 bg-white">{{ post.fullText }}</div>
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
