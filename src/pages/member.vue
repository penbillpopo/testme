<template>
    <div>
        <navbar :ishome='islogin'></navbar>
        <div id="member">
            <router-view></router-view>
            <!-- <testLB></testLB> -->
        </div>
        <foot></foot>
    </div>
</template>

<script>
import navbar from '@/components/common/navbar.vue'
import foot from '@/components/common/foot.vue'
// import testLB from '@/components/lightbox/testLB.vue'
export default {
    name: 'member',
    data:function(){
        return {
            islogin:false
        }        
    },
    mounted:function(){
        this.$http.post('http://localhost/testmedb/api/member.php',JSON.stringify({
            "account": sessionStorage['account'],
            "password": sessionStorage['password']
        })).then((response) => {
            console.log(response.data);
        });
    },
    components:{
        navbar,
        foot,
        // testLB
    }
}
</script>

<style lang="scss" src="@/assets/scss/pages/member.scss"></style>
