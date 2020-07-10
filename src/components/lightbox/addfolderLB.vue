<template>
    <div id="addfolderLB">
        <div class="blackfield">
            <div class="LBcontent">
                <div class="headbar">
                    <div class="textfield">
                        <h6 class="title">
                            Add Folder
                        </h6>
                    </div>
                    <div class="closebtn" @click="CloseAddFolderLB"></div>
                </div>
                <div class="content">
                   <div class="inputbox">
                        <input type="text" name="account" id="foldername" v-model="foldername" placeholder="Folder Name">
                    </div>
                    <div class="inputbox">
                        <button type="button" @click="ConfirmAddFolder">
                            <h5 class="text">Confirm</h5>
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
    }
}
</script>

<style lang="scss" scoped src="@/assets/scss/components/addfolderLB.scss"></style>