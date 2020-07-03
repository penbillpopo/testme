<template>
    <div id="navbar">
        <div class="left">
            <router-link class="logo" to="/index">
                <h5 class="text">
                    TESTME
                </h5>
            </router-link>
        </div>
        <div class="right">
            <div class="mode_loginout">
                <!-- <router-link class="login" to="/member">
                    <p class="text">
                        LOGIN
                    </p>
                </router-link> -->
                <button type="button" class="login" @click="OpenLoginLB">
                    <p class="text">
                        LOGIN
                    </p>
                </button>
                <button type="button" class="regist" @click="OpenRegistLB">
                    <p class="text">
                        REGIST
                    </p>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {  
    methods:{
        OpenLoginLB(){
            this.$store.state.login.isLoginLBOpen = true;
        },
        OpenRegistLB(){
            this.$store.state.regist.isRegistLBOpen = true;
        }
    },
}
</script>

<style lang="scss" src="@/assets/scss/components/navbar.scss"></style>