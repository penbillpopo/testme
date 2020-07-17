<template>
    <div>
        <navbar :ishome='islogin'></navbar>
        <div id="home">
            <div class="introbox">
                <div class="content w1200">
                    <img class="logoimg" src="@/assets/img/icon/pen.svg" alt="">
                    <h4 class="title">
                        Welcome TESTME!
                    </h4>
                    <p class="text">
                        Do you have problem of memorize something?<br>
                        Don't worry about that.<br>
                        You can build your own word cards and test yourself.
                    </p>
                    <button class="loginbtn" type="button">
                        <h5 class="text">start now</h5>
                    </button>
                </div>
            </div>          
            <loginLB v-if="IsLoginLB"></loginLB>
            <registLB v-if="IsRegistLB"></registLB>
            <forgotLB v-if="IsForgotLB"></forgotLB>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import navbar from '@/components/common/navbar.vue'
import foot from '@/components/common/foot.vue'
import loginLB from '@/components/lightbox/loginLB'
import registLB from '@/components/lightbox/registLB'
import forgotLB from '@/components/lightbox/forgotLB'
export default {
    name: 'Home',
    data:function(){
        return {
            islogin:true,
        }        
    },
    computed:{
        IsLoginLB(){
            return this.$store.getters.getLoginLBOpen;
        },
        IsRegistLB(){
            return this.$store.getters.getRegistLBOpen;
        },
        IsForgotLB(){
            return this.$store.getters.getForgotLBOpen;
        }
    },
    components:{
        navbar,
        foot,
        loginLB,
        registLB,
        forgotLB
    }
}
</script>

<style lang="scss" src="@/assets/scss/pages/home.scss"></style>
