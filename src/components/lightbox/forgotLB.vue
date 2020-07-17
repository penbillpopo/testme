<template>
    <LBmodel>
        <template slot="headbar">
            <div class="textfield">
                <h6 class="title">
                    FORGOT
                </h6>
            </div>
            <div class="closebtn" @click="CloseForgotLB"></div>
        </template>
        <template slot="content">
           <div class="inputbox">
                <input type="text" name="email" id="email" v-model="email" placeholder="EMAIL">
                <p class="validatelog">{{ validation.firstError('email') }}</p>
            </div>
            <div class="inputbox">
                <button type="button" @click="SubmitEmail">
                    <h5 class="text">Confirm</h5>
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
            email:""
        }
    },
    methods:{
        CloseForgotLB(){
            this.$store.dispatch('updateForgotLBOpen',false);
        },
        SubmitEmail(){
            let _this = this;
            this.$validate()
            .then(function(success) {
                if (success) {
                    _this.swalAlert('Email yeap',false);                    
                }
                else{
                   _this.swalAlert('Email nope',false);
                }
            });
        },
    },
    validators: {
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