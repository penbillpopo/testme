<template>
    <LBmodel>
        <template slot="headbar">
            <div class="textfield">
                <h6 class="title">
                    Add Folder
                </h6>
            </div>
            <div class="closebtn" @click="CloseAddFolderLB"></div>
        </template>
        <template slot="content">
           <div class="inputbox">
                <input type="text" name="foldername" id="foldername" v-model="foldername" placeholder="Folder Name">
                <p class="validatelog">{{ validation.firstError('foldername') }}</p>
            </div>
            <div class="inputbox">
                <button type="button" @click="ConfirmAddFolder">
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
        return{
            foldername:''
        }
    },
    methods:{
        CloseAddFolderLB(){
            this.$store.dispatch('updateAddFolderLBOpen',false);
        },
        ConfirmAddFolder(){
            let _this = this;
            this.$validate()
            .then(function(success) {
                if (success) {
                    _this.$http.post(_this.$store.state.dbhost+'/testmedb/api/member/addfolder.php',JSON.stringify({
                        "userid": _this.$store.getters.getMemberId,
                        "foldername": _this.foldername,
                    })).then(() => {
                        _this.$emit('updatedata');
                        _this.$store.dispatch('updateAddFolderLBOpen',false);
                    });
                }
                else{
                    _this.swalAlert('Validation failed',false);
                }
            });
            
        }
    },
    validators: {
        foldername: function (value) {
            return Validator.value(value).required('Required');
        }
    },
    components:{
        LBmodel
    }
}
</script>