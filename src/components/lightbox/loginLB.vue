<template>
    <LBmodel>
        <template slot="headbar">
            <div class="textfield">
                <h6 class="title">
                    LOGIN
                </h6>
            </div>            
            <div class="closebtn" @click="CloseLoginLB"></div>
        </template>
        <template slot="content">
            <div class="inputbox">
                <input type="text" name="account" id="account" v-model="account" placeholder="ACCOUNT">
                <p class="validatelog">{{ validation.firstError('account') }}</p>
            </div>
            <div class="inputbox">
                <input type="text" name="password" id="password" v-model="password" placeholder="PASSWORD">
                <p class="validatelog">{{ validation.firstError('password') }}</p>
            </div>
            <button class="text_right" @click="OpenForgotLB">
                <p class="text">forgot?</p>
            </button>
            <div class="inputbox">
                <button type="button" @click="SubmitLogin">
                    <h5 class="text">Login</h5>
                </button>                        
            </div>
            <div class="inputbox">
               <div id="signin_google" @click="isgooglesignin=true"></div>
            </div>
        </template>
    </LBmodel>    
</template>
<script>
import LBmodel from '@/components/lightbox/_LBmodel';
import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;
export default {
    data(){
        return {
            account:'',
            password:'',
            isgooglesignin:false,
        }
    },   
    mounted() {
        window.gapi.signin2.render('signin_google', { 
            'scope': 'profile email',
            'width': 'auto',
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.googleSignin
        });
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
                    _this.setlogindata(_this.account,_this.password);
                    _this.checklogin(function(){
                        _this.CloseLoginLB();
                        localStorage['islogin'] = '1'; 
                        _this.$router.push('/member'); 
                    },function(){
                        _this.swalAlert('Account incorrect',false);
                    });                
                }
                else{
                    _this.swalAlert('Validation failed',false);
                }
            });
        },
        //全域func(暫時)
        setlogindata(_account,_password) {
            localStorage['account'] = _account;
            localStorage['password'] = _password;
        },
        checklogin(_success,_fail) {
            let account = localStorage['account'];
            let password = localStorage['password'];
            
            if(account!=null && password!=null){                    
                this.$http.post(this.$store.state.dbhost+'/testmedb/api/login.php',JSON.stringify({
                    "account": account,
                    "password": password
                })).then((response) => {
                    switch(response.data){
                        case 1:
                            localStorage['islogin'] = '1';
                            _success();
                            return true;
                        case 0:
                            //無效帳密，從session中清除
                            localStorage['islogin'] = '0';
                            localStorage['account'] = null;
                            localStorage['password'] = null;
                            _fail();
                            return false;
                    }
                });
            }
        },
        googleSignin(googleUser) {
            if(this.isgooglesignin){
                var profile = googleUser.getBasicProfile();
                let g_account = profile.getName()+'_'+profile.getId();
                let g_password = profile.getId();
                let g_email = profile.getEmail();
                let _this = this;
                this.setlogindata(g_account,g_password);
                this.checklogin(function(){
                    _this.CloseLoginLB();
                    localStorage['islogin'] = '1'; 
                    _this.$router.push('/member');
                    _this.$store.dispatch('updateIsgoogle',true);
                },function(){
                     _this.$http.post(_this.$store.state.dbhost+'/testmedb/api/regist.php',JSON.stringify({
                        "account": g_account,
                        "password": g_password,
                        "email":g_email
                    })).then((response) => {
                        switch(response.data){
                            case 1:
                                localStorage['islogin'] = '1'; 
                                _this.CloseLoginLB();
                                _this.setlogindata(g_account,g_password);
                                _this.$router.push('/member'); 
                                _this.$store.dispatch('updateIsgoogle',true);
                                break;
                            case 0:
                                _this.swalAlert('Connecting error',false);
                                break;
                        }
                    });
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
    components:{
        LBmodel
    }
}
</script>