<template>
    <div>
        <navbar :ishome='islogin'></navbar>
        <div id="member">
            <router-view></router-view>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import navbar from '@/components/common/navbar.vue'
import foot from '@/components/common/foot.vue'
export default {
    name: 'member',
    data:function(){
        return {
            islogin:false
        }        
    },
    components:{
        navbar,
        foot,
    }
}
</script>

<style lang="scss" src="@/assets/scss/pages/member.scss"></style>
