<template>
    <div>
        <navbar></navbar>
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
import navbar from '@/components/navbar.vue'
import foot from '@/components/foot.vue'
import loginLB from '@/components/loginLB'
import registLB from '@/components/registLB'
import forgotLB from '@/components/forgotLB'
export default {
    name: 'Home',
    data:function(){
        return {
           
        }        
    },
    computed:{
        IsLoginLB(){
            return this.$store.state.login.isLoginLBOpen;
        },
        IsRegistLB(){
            return this.$store.state.regist.isRegistLBOpen;
        },
        IsForgotLB(){
            return this.$store.state.forgot.isForgotLBOpen;
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
