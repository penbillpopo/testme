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
                <div v-if='!ishome'>
                    <button type="button" class="login" @click="LogOut">
                        <p class="text">
                            LOGOUT
                        </p>
                    </button>
                </div>
                <div v-if='ishome'>
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
    </div>
</template>

<script>
export default {
    props: {
        ishome:{
            type:Boolean
        }
    },
    methods:{
        OpenLoginLB(){
            this.$store.state.page.login.isLoginLBOpen = true;
        },
        OpenRegistLB(){
            this.$store.state.page.login.isRegistLBOpen = true;
        },
        LogOut(){
            localStorage['account'] = null;
            localStorage['password'] = null;
            localStorage['islogin'] = '0';

            let _this = this;
            if(this.$store.getters.getIsgoogle){
                var auth2 = window.gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    _this.$store.dispatch('updateIsgoogle',false);
                    _this.$router.push('/index');            
                });
            }else{
                this.$router.push('/index');            
            }            
        }
    },
}
</script>

<style lang="scss" src="@/assets/scss/components/navbar.scss"></style>