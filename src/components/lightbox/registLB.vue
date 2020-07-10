<template>
    <div id="registLB">
        <div class="blackfield">
            <div class="LBcontent">
                <div class="headbar">
                    <h5 class="title">
                        REGIST
                    </h5>
                    <div class="closebtn" @click="CloseRegistLB"></div>
                </div>
                <div class="content">
                    <div class="inputbox">
                        <input type="text" name="account" id="account" v-model="account" placeholder="ACCOUNT">
                    </div>
                    <div class="inputbox">
                        <input type="text" name="password" id="password" v-model="password" placeholder="PASSWORD">
                    </div>
                    <div class="inputbox">
                        <input type="text" name="c_password" id="c_password" placeholder="CONFIRM PASSWORD">
                    </div>
                    <div class="inputbox">
                        <input type="text" name="email" id="email" v-model="email" placeholder="EMAIL">
                    </div>
                    <div class="inputbox">
                        <button type="button" @click="SubmitRegist">
                            <h5 class="text">Regist</h5>
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
            account:"",
            password:"",
            email:""
        }
    },
    methods:{
        CloseRegistLB(){
            this.$store.dispatch('updateRegistLBOpen',false);
        },
        SubmitRegist(){
            this.$http.post(this.$store.state.dbhost+'/testmedb/api/regist.php',JSON.stringify({
                "account": this.account,
                "password": this.password,
                "email":this.email
            })).then((response) => {
                switch(response.data){
                    case 1:
                        this.$swal('Success');
                        this.CloseRegistLB();
                        break;
                    case 0:
                        this.$swal('Failure');
                        break;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped src="@/assets/scss/components/loginLB.scss"></style>