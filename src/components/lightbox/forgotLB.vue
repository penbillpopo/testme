<template>
    <div id="forgotLB">
        <div class="blackfield">
            <div class="LBcontent">
                <div class="headbar">
                    <h5 class="title">
                        FORGOT
                    </h5>
                    <div class="closebtn" @click="CloseForgotLB"></div>
                </div>
                <div class="content">                   
                    <div class="inputbox">
                        <input type="text" name="email" id="email" placeholder="EMAIL">
                    </div>
                    <div class="inputbox">
                        <button type="button">
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
    methods:{
        CloseForgotLB(){
            this.$store.dispatch('updateForgotLBOpen',false);
        },
    }
}
</script>

<style lang="scss" scoped src="@/assets/scss/components/loginLB.scss"></style>