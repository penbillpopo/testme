<template>
    <LBmodel>
        <template slot="headbar">
            <div class="textfield">
                <h6 class="title">
                    REGIST
                </h6>
            </div>
            <div class="closebtn" @click="CloseRegistLB"></div>
        </template>
        <template slot="content">
            <div class="inputbox">
                <input type="text" name="account" id="account" v-model="account" placeholder="ACCOUNT">
                <p class="validatelog">{{ validation.firstError('account') }}</p>
            </div>
            <div class="inputbox">
                <input type="password" name="password" id="password" v-model="password" placeholder="PASSWORD">
                <p class="validatelog">{{ validation.firstError('password') }}</p>
            </div>
            <div class="inputbox">
                <input type="password" name="c_password" id="c_password" v-model="c_password" placeholder="CONFIRM PASSWORD">
                <p class="validatelog">{{ validation.firstError('c_password') }}</p>
            </div>
            <div class="inputbox">
                <input type="text" name="email" id="email" v-model="email" placeholder="EMAIL">
                <p class="validatelog">{{ validation.firstError('email') }}</p>
            </div>
            <div class="inputbox">
                <button type="button" @click="SubmitRegist">
                    <h5 class="text">Regist</h5>
                </button>
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
            account:"",
            password:"",
            c_password:"",
            email:""
        }
    },
    methods:{
        CloseRegistLB(){
            this.$store.dispatch('updateRegistLBOpen',false);
        },
        SubmitRegist(){
            let _this = this;
            this.$validate()
            .then(function(success) {
                if (success) {
                    _this.$http.post(_this.$store.state.dbhost+'/testmedb/api/regist.php',JSON.stringify({
                        "account": _this.account,
                        "password": _this.password,
                        "email":_this.email
                    })).then((response) => {
                        switch(response.data){
                            case 1:
                                _this.swalAlert('Register success',true);
                                _this.CloseRegistLB();
                                break;
                            case 0:
                                _this.swalAlert('Account already exists',false);
                                break;
                        }
                    });
                }
                else{
                   _this.swalAlert('Validation failed',false);
                }
            });
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
        'c_password, password': function (c_password, password) {
            return Validator.value(c_password).required().match(password);

        },
        email: function (value) {
            return Validator.value(value).required('Required')
            .email();
        },
    },
    components:{
        LBmodel
    }
}
</script>