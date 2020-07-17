<template>
    <div id="loginLB">
        <div class="blackfield">
            <div class="LBcontent">
                <div class="headbar">
                    <slot name="headbar"></slot>
                </div>
                <div class="content">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.LBOpen();
    },
    destroyed(){
        this.LBClose();
    },
    methods:{
        LBOpen(){
            document.body.classList.add("LBOpen");
        },
        LBClose(){
            document.body.classList.remove("LBOpen");
        }
    }
}
</script>

<style lang="scss" scoped src="@/assets/scss/components/lightbox/_LBmodel.scss"></style>