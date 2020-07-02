import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/pages/home.vue'
import member from '@/pages/member.vue'
import memberindex from '@/components/memberIndex.vue'
import memberfolder from '@/components/memberFolder.vue'
import membertextedit from '@/components/memberTestEdit.vue'


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
        },
        {
            name:"會員",
            path:"/member",
            component:member,
            children:[
                {
                    name:"會員首頁",
                    path:"",
                    component:memberindex,
                },
                {
                    name:"會員資料夾",
                    path:"folder",
                    component:memberfolder,
                },
                {
                    name:"會員編輯測驗",
                    path:"testEdit",
                    component:membertextedit,
                },
            ]
        }
    ]
});