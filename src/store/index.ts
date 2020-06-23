import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tweetUrl: '',
    tweetData: {},
    isTweetLoaded: false
  },
  mutations: {
    SET_TWEET_URL(state, value) {
      state.tweetUrl = value;
    },
    SET_IS_TWEET_LOADED(state, value) {
      state.isTweetLoaded = value;
    },
    SET_TWEET_DATA(state, data) {
      state.tweetData = data;
    }
  },
  actions: {
    setTweetUrl(context, url) {
      context.commit('SET_TWEET_URL', url);
    },
    setIsTweetLoaded(context, value) {
      context.commit('SET_IS_TWEET_LOADED', value);
    },
    setTweetData(context, data) {
      context.commit('SET_TWEET_DATA', data);
    }
  },
  modules: {}
});
