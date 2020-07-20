<template>
  <div
    id="container"
    class="w-11/12 h-screen pt-8 pb-48 mx-auto md:w-4/5 lg:w-2/3 xl:w-1/2"
  >
    <div class="my-16 md:mb-16 md:mt-0">
      <app-search-bar
        :value="$store.state.threadUrl"
        :loading-status="isThreadLoading"
        class="inline-block w-10/12"
      ></app-search-bar>
      <div class="inline-block w-2/12">
        <app-btn class="inline-block mx-2">LOAD</app-btn>
      </div>
    </div>
    <app-options-bar v-model="options"></app-options-bar>
    <div
      id="posts-list"
      class="h-full overflow-auto scrolling-touch rounded-b-lg"
    >
      <div v-for="post in postsData" :key="post.content.idStr">
        <app-post :post-data="post"></app-post>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SearchBar from '../components/subcomponents/SearchBar.vue';
import OptionsBar from '@/components/ThreadView/OptionsBar.vue';
import Post from '../components/ThreadView/Post.vue';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState({
      threadDataSorted: 'threadDataSorted'
    })
  },
  components: {
    'app-post': Post,
    'app-search-bar': SearchBar,
    'app-options-bar': OptionsBar
  }
})
export default class ThreadView extends Vue {
  isThreadLoading = false;
  searchInput: string = this.$store.state.threadUrl;
  postsData: Array<any> = [];
  options = { sortBy: 'Date', ascDesc: 'Descending' };

  @Watch('options', { deep: true })
  async onOptionsChange() {
    await this.$store.dispatch('sortData', this.options);
    this.buildPostsData();
  }

  // injects users info to posts info
  buildPostsData() {
    this.postsData = this.$store.state.threadDataSorted.posts.map((v: any) => {
      const [user] = this.$store.state.threadDataSorted.users.filter(
        (el: any) => el.idStr === v.userIdStr
      );
      return {
        content: v,
        user
      };
    });
  }

  async created() {
    await this.$store.dispatch('sortData', this.options);
    this.buildPostsData();
  }
}
</script>

<style scoped>
#posts-list::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
#posts-list::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
#posts-list::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border: 0px none #ffffff;
  border-radius: 100px;
}
#posts-list::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}
#posts-list::-webkit-scrollbar-thumb:active {
  background: #c7c7c7;
}
#posts-list::-webkit-scrollbar-track {
  background: #c7c7c7;
  border: 0px none #ffffff;
  border-radius: 100px;
}
#posts-list::-webkit-scrollbar-track:hover {
  background: #949494;
}
#posts-list::-webkit-scrollbar-track:active {
  background: #636363;
}
#posts-list::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
