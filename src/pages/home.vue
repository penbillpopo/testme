<template>
    <div>
        <navbar></navbar>
        <div id="home">
            <div class="introbox">
                <div class="content w1200">
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
            <!-- <loginLB></loginLB> -->
            <!-- <registLB></registLB> -->
            <!-- <forgotLB></forgotLB> -->
        </div>
        <foot></foot>
    </div>
</template>

<script>
import navbar from '@/components/navbar.vue'
import foot from '@/components/foot.vue'
// import loginLB from '@/components/loginLB'
// import registLB from '@/components/registLB'
// import forgotLB from '@/components/forgotLB'
export default {
    name: 'Home',
    components:{
        navbar,
        foot,
        // loginLB,
        // registLB,
        // forgotLB
    }
}
</script>

<style lang="scss" src="@/assets/scss/pages/home.scss"></style>
