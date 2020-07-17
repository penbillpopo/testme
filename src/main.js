import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import SimpleVueValidation from 'simple-vue-validator';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2);
Vue.use(SimpleVueValidation);
Vue.mixin({
  methods: {
    //extension
    swalAlert(_title,_isSuccess){
      this.$swal.fire({
        icon: _isSuccess?'success':'error',
        title: _title        
      })
    },
    swalAlertText(_title,_text,_isSuccess){
      this.$swal.fire({
        icon: _isSuccess?'success':'error',
        text:_text,
        title: _title        
      })
    },
    swalAlertYN(_text,_func){
      this.$swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: _text
        }).then((result) => {
          if(result.value){
            _func();
          }     
        });  
    }
  }
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

//全域function
