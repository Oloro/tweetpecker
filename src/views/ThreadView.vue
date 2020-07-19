<template>
  <div
    id="container"
    class="w-11/12 h-screen mx-auto overflow-auto scrolling-touch md:w-4/5 lg:w-2/3 xl:w-1/2"
  >
    <div class="mt-8 mb-16">
      <app-search-bar
        v-model="searchInput"
        :loading-status="isThreadLoading"
        class="inline-block w-10/12 "
      ></app-search-bar>
      <div class="inline-block w-2/12">
        <app-button class="inline-block mx-2">LOAD</app-button>
      </div>
    </div>

    <div v-for="post in postsData" :key="post.content.idStr">
      <app-post :post-data="post"></app-post>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchBar from '../components/subcomponents/SearchBar.vue';
import SearchView from './SearchView.vue';
import Button from '../components/subcomponents/Button.vue';
import Post from '../components/ThreadView/Post.vue';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState({
      threadData: 'threadData'
    })
  },
  components: {
    'app-post': Post,
    'app-search-bar': SearchBar,
    'app-button': Button
  }
})
export default class ThreadView extends Vue {
  isThreadLoading = false;
  searchInput: string = this.$store.state.threadUrl;
  postsData: Array<any> = [];

  // injects users info to posts info
  buildPostsData(this: any) {
    this.postsData = this.threadData.posts.map((v: any) => {
      const [user] = this.threadData.users.filter(
        (el: any) => el.idStr === v.userIdStr
      );
      return {
        content: v,
        user
      };
    });
  }

  created() {
    this.buildPostsData();
  }
}
</script>

<style scoped>
#container::-webkit-scrollbar {
  display: none;
}
</style>
