import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/pages/home.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/index"
        },
        {
            name:"首頁",
            path:"/index",
            component:home
        }
    ]
});