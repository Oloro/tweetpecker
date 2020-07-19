import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './assets/tailwind.css';
import axios from 'axios';
import vueAxios from 'vue-axios';

import Button from '@/components/subcomponents/Button.vue';
import Alert from '@/components/subcomponents/Alert.vue';
import Dropdown from '@/components/subcomponents/Dropdown.vue';
import { config } from 'vue/types/umd';

Vue.config.productionTip = false;
Vue.component('app-btn', Button);
Vue.component('app-alert', Alert);
Vue.component('app-dropdown', Dropdown);
Vue.use(vueAxios, axios);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
