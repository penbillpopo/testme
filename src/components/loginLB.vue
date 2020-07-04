<template>
    <div id="loginLB">
        <div class="blackfield">
            <div class="LBcontent">
                <div class="headbar">
                    <h5 class="title">
                        LOGIN
                    </h5>
                    <div class="closebtn" @click="CloseLoginLB"></div>
                </div>
                <div class="content">
                    <div class="inputbox">
                        <input type="text" name="account" id="account" v-model="account" placeholder="ACCOUNT">
                    </div>
                    <div class="inputbox">
                        <input type="text" name="password" id="password" v-model="password" placeholder="PASSWORD">
                    </div>
                    <button class="forget" @click="OpenForgotLB">
                        <p class="text">forget?</p>
                    </button>
                    <div class="inputbox">
                        <button type="button" @click="SubmitLogin">
                            <!-- <h5 class="text">LOGIN</h5> -->
                            <router-link to="/member">LOGIN</router-link>
                        </button>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            account:'',
            password:''
        }
    },
    methods:{
        CloseLoginLB(){
            this.$store.state.login.isLoginLBOpen = false;
        },
        OpenForgotLB(){
            this.$store.state.forgot.isForgotLBOpen = true;
            this.$store.state.login.isLoginLBOpen = false;
        },
        SubmitLogin(){
            // this.$http.post('http://localhost/testdb/index.php',JSON.stringify({
            //     "account": this.account,
            //     "password": this.password
            // })).then((response) => {
            //     alert(response.data);
            // });
            // this.$http.get('http://localhost/testdb/index.php',{
            //     params: {
            //         'account': 'ppppp'
            //     }
            // }).then((response) => {
            //     alert(response.data);
            // });
        }
    }
}
</script>

<style lang="scss" src="@/assets/scss/components/loginLB.scss"></style>