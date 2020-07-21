import Vue from 'vue';
import Vuex from 'vuex';
import { SortOptions } from './SortByOptions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    threadUrl: '',
    threadData: { posts: Array(0), users: Array(0) },
    threadDataSorted: {},
    isThreadLoaded: false
  },
  mutations: {
    SET_THREAD_URL(state, value) {
      state.threadUrl = value;
    },
    SET_IS_THREAD_LOADED(state, value) {
      state.isThreadLoaded = value;
    },
    SET_THREAD_DATA(state, data) {
      state.threadData = data;
    },
    SORT_DATA(
      state,
      data: {
        sortBy: 'Date' | 'Likes' | 'Retweets' | 'Replies'; // fix this!
        ascDesc: string;
      }
    ) {
      console.log(data);
      if (state.threadData.posts) {
        state.threadDataSorted = {
          posts: state.threadData.posts.sort((a, b) => {
            if (data.ascDesc === 'Ascending') {
              if (a[SortOptions[data.sortBy]] > b[SortOptions[data.sortBy]]) {
                return 1;
              } else return -1;
            } else {
              if (a[SortOptions[data.sortBy]] < b[SortOptions[data.sortBy]]) {
                return 1;
              } else return -1;
            }
          }),
          users: state.threadData.users
        };
      }
    }
  },
  actions: {
    setThreadUrl(context, url) {
      context.commit('SET_THREAD_URL', url);
    },
    setIsThreadLoaded(context, value) {
      context.commit('SET_IS_THREAD_LOADED', value);
    },
    setThreadData(context, data) {
      context.commit('SET_THREAD_DATA', data);
    },
    sortData(context, data) {
      context.commit('SORT_DATA', data);
    }
  },
  modules: {}
});
