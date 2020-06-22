import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './assets/tailwind.css';

import Button from './components/controls/Button.vue';

Vue.config.productionTip = false;
Vue.component('app-btn', Button);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
