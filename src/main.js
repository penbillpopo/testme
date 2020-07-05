import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import App from './App.vue' 


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')