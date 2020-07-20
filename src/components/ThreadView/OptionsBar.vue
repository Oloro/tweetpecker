<template>
  <div class="w-full p-2 bg-gray-300 rounded-t-lg">
    <app-dropdown v-model="sortBy" :options="sortOptions" class="inline-block"
      >Sort by</app-dropdown
    >
    <app-dropdown
      v-model="ascDesc"
      :options="ascDescOptions"
      class="inline-block"
    ></app-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Dropdown from '@/components/subcomponents/Dropdown.vue';

@Component({
  components: {
    'app-dropdown': Dropdown
  },
  model: {
    prop: 'selectedSortOptions',
    event: 'sortOptionsChange'
  }
})
export default class OptionsBar extends Vue {
  sortOptions = ['Date', 'Likes', 'Retweets', 'Replies'];
  ascDescOptions = ['Ascending', 'Descending'];
  @Prop({ default: { sortBy: 'Date', ascDesc: 'Descending' }, type: Object })
  selectedSortOptions?: Record<string, any>;
  sortBy = 'Date';
  ascDesc = 'Descending';
  @Watch('sortBy')
  onSortByChange() {
    this.sortOptionsChange();
  }
  @Watch('ascDesc')
  onAscDescChange() {
    this.sortOptionsChange();
  }
  sortOptionsChange() {
    this.$emit('sortOptionsChange', {
      sortBy: this.sortBy,
      ascDesc: this.ascDesc
    });
  }

  created() {
    this.sortBy = this.selectedSortOptions!.sortBy;
    this.ascDesc = this.selectedSortOptions!.ascDesc;
  }
}
</script>

<style scoped></style>
