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
                        <p class="validatelog">{{ validation.firstError('account') }}</p>
                    </div>
                    <div class="inputbox">
                        <input type="text" name="password" id="password" v-model="password" placeholder="PASSWORD">
                        <p class="validatelog">{{ validation.firstError('password') }}</p>
                    </div>
                    <button class="forget" @click="OpenForgotLB">
                        <p class="text">forget?</p>
                    </button>
                    <div class="inputbox">
                        <button type="button" @click="SubmitLogin">
                            <h5 class="text">Login</h5>
                        </button>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;
export default {
    data(){
        return {
            account:'',
            password:''
        }
    },
    methods:{
        CloseLoginLB(){
            this.$store.dispatch('updateLoginLBOpen',false);
        },
        OpenForgotLB(){
            this.$store.dispatch('updateForgotLBOpen',true);
            this.$store.dispatch('updateLoginLBOpen',false);
        },
        SubmitLogin(){
            let _this = this;
            this.$validate()
            .then(function(success) {
                if (success) {
                    this.setlogindata(this.account,this.password);
                    this.checklogin(function(){
                        _this.CloseLoginLB();
                        sessionStorage['islogin'] = '1'; 
                        _this.$router.push('/member'); 
                    },function(){
                        _this.$swal('Failure');
                    });                
                }
                else{
                    _this.$swal('Nope');
                }
            });
        },
        //全域func(暫時)
        setlogindata(_account,_password) {
            sessionStorage['account'] = _account;
            sessionStorage['password'] = _password;
        },
        checklogin(_success,_fail) {
            let account = sessionStorage['account'];
            let password = sessionStorage['password'];
            
            if(account!=null && password!=null){                    
                this.$http.post(this.$store.state.dbhost+'/testmedb/api/login.php',JSON.stringify({
                    "account": account,
                    "password": password
                })).then((response) => {
                    switch(response.data){
                        case 1:
                            sessionStorage['islogin'] = '1';
                            _success();
                            return true;
                        case 0:
                            //無效帳密，從session中清除
                            sessionStorage['islogin'] = '0';
                            sessionStorage['account'] = null;
                            sessionStorage['password'] = null;
                            _fail();
                            return false;
                    }
                });
            }
        }

    },
    validators: {
        account: function (value) {
            return Validator.value(value).required('Required')
            .regex('^[A-Za-z_0-9]*$', 'Only contains letters or numbers');
        },
        password: function (value) {
            return Validator.value(value).required('Required')
            .regex('^[A-Za-z_0-9]*$', 'Only contains letters or numbers');
        },
    },
}
</script>

<style lang="scss" scoped src="@/assets/scss/components/loginLB.scss"></style>