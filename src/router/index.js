import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/pages/home.vue'
import member from '@/pages/member.vue'
import memberindex from '@/components/member/memberIndex.vue'
import memberfolder from '@/components/member/memberFolder.vue'
import membertextedit from '@/components/member/memberTestEdit.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode:'hash',
    routes:[
        {
            path:"/",
            redirect:"/index"
        },
        {
            name:"index",
            path:"/index",
            beforeEnter (to, from, next) {
                if(localStorage['islogin']=='1'){
                    next('/member');
                }
                else{
                    next();
                }
            },
            component:home
        },
        {
            name:"member",
            path:"/member",
            beforeEnter (to, from, next) {
                if(localStorage['islogin']=='1'){
                    next();
                }
                else{
                    next('/index');
                }
            },
            component:member,
            children:[
                {
                    name:"會員首頁",
                    path:"",
                    component:memberindex,
                },
                {
                    name:"會員資料夾",
                    path:"folder/:foldername/:folderid",
                    component:memberfolder,
                },
                {
                    name:"會員編輯測驗",
                    path:"testEdit/:testname/:folderid/:testid",
                    component:membertextedit,
                },
            ]
        }
    ]
});