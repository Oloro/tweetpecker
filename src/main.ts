import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './assets/tailwind.css';

import Button from '@/components/subcomponents/Button.vue';
import Alert from '@/components/subcomponents/Alert.vue';

Vue.config.productionTip = false;
Vue.component('app-btn', Button);
Vue.component('app-alert', Alert);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
