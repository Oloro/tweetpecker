import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    threadUrl: '',
    ThreadData: {},
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
      state.ThreadData = data;
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
    }
  },
  modules: {}
});
