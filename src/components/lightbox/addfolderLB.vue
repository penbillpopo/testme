<template>
    <LBmodel>
        <template slot="headbar">
            <div class="textfield">
                <h5 class="title">
                    Add Folder
                </h5>
            </div>
            <div class="closebtn" @click="CloseAddFolderLB"></div>
        </template>
        <template slot="content">
           <div class="inputbox">
                <input type="text" name="account" id="foldername" v-model="foldername" placeholder="Folder Name">
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
            this.$http.post(this.$store.state.dbhost+'/testmedb/api/member/addfolder.php',JSON.stringify({
                "userid": this.$store.getters.getMemberId,
                "foldername": this.foldername,
            })).then(() => {
                this.$emit('updatedata');
                this.$store.dispatch('updateAddFolderLBOpen',false);
            });
        }
    },
    components:{
        LBmodel
    }
}
</script>