import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tweetUrl: '',
    isTweetLoaded: false
  },
  mutations: {
    SET_TWEET_URL(state, value) {
      state.tweetUrl = value;
    },
    SET_IS_TWEET_LOADED(state, value) {
      state.isTweetLoaded = value;
    }
  },
  actions: {
    setTweetUrl(context, url) {
      context.commit('SET_TWEET_URL', url);
    },
    setIsTweetLoaded(context, value) {
      context.commit('SET_IS_TWEET_LOADED', value);
    }
  },
  modules: {}
});
