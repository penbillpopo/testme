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
                        <input type="text" name="account" id="account" placeholder="ACCOUNT">
                    </div>
                    <div class="inputbox">
                        <input type="text" name="password" id="password" placeholder="PASSWORD">
                    </div>
                    <div class="inputbox">
                        <input type="text" name="c_password" id="c_password" placeholder="CONFIRM PASSWORD">
                    </div>
                    <div class="inputbox">
                        <input type="text" name="email" id="email" placeholder="EMAIL">
                    </div>
                    <div class="inputbox">
                        <button type="button">
                            <h5 class="text">REGIST</h5>
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
        CloseRegistLB(){
            this.$store.state.regist.isRegistLBOpen = false;
        }
    }
}
</script>

<style lang="scss" src="@/assets/scss/components/loginLB.scss"></style>