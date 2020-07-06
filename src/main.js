import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import global from './js/global.js';
import App from './App.vue';

Vue.prototype.global = global;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')