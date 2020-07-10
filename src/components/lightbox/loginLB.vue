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
            this.$store.state.page.login.isLoginLBOpen = false;
        },
        OpenForgotLB(){
            this.$store.state.page.login.isForgotLBOpen = true;
            this.$store.state.page.login.isLoginLBOpen = false;
        },
        SubmitLogin(){
            this.setlogindata(this.account,this.password);
            let ismember = this.checklogin();            
            console.log(ismember);
            //非同步，有錯!
            if(ismember){
                this.CloseLoginLB();
                sessionStorage['islogin'] = '1'; 
                this.$router.push('/member'); 
            }
            // this.$http.get('http://localhost/testdb/index.php',{
            //     params: {
            //         'account': 'ppppp'
            //     }
            // }).then((response) => {
            //     alert(response.data);
            // });
        },
        //全域func(暫時)
        setlogindata(_account,_password) {
            sessionStorage['account'] = _account;
            sessionStorage['password'] = _password;
        },
        checklogin() {
            let account = sessionStorage['account'];
            let password = sessionStorage['password'];
            
            if(account!=null && password!=null){                    
                this.$http.post('http://localhost/testmedb/api/login.php',JSON.stringify({
                    "account": account,
                    "password": password
                })).then((response) => {
                    switch(response.data){
                        case 1:
                            sessionStorage['islogin'] = '1';
                            return true;
                        case 0:
                            //無效帳密，從session中清除
                            sessionStorage['islogin'] = '0';
                            sessionStorage['account'] = null;
                            sessionStorage['password'] = null;
                            return false;
                    }
                });
            }
        }

    }
}
</script>

<style lang="scss" src="@/assets/scss/components/loginLB.scss"></style>