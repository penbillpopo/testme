<template>
    <div>
        <navbar></navbar>
        <div id="home">
            <div class="introbox">
                <div class="content w1200">
                    <div class="left">
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
                    <div class="right">  
                    </div>
                </div>
            </div>
            <div class="stepbox">
                <div class="content w1200">
                    <div class="step">
                        <h5 class="title">STEP 1</h5>
                        <p class="text">Make a question</p>
                    </div>
                    <div class="step">
                        <h5 class="title">STEP 2</h5>
                        <p class="text">White the answer</p>
                    </div>
                    <div class="step">
                        <h5 class="title">STEP 3</h5>
                        <p class="text">Start test</p>
                    </div>
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
