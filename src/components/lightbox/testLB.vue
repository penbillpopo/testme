<template>
    <div id="testLB">
        <div class="blackfield">
            <div class="LBcontent">
                <div class="headbar">
                    <div class="textfield">
                        <h6 class="title">
                            Test_01
                        </h6>
                        <h6 class="count">
                            1/10
                        </h6>
                    </div>
                    <div class="closebtn"></div>
                </div>
                <div class="content">
                    <div class="textfield">
                        <h4 class="text">
                            Answer
                        </h4>
                    </div>
                    <div class="btnfield">
                        <div class="ansbtnbox">
                            <button class="correct">
                                <h6 class="text">Correct</h6>
                            </button>
                            <button class="wrong">
                                <h6 class="text">Wrong</h6>
                            </button>
                        </div>
                        <!-- <button class="checkbtn" type="button">
                            <h6 class="text">></h6>
                        </button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" src="@/assets/scss/components/testLB.scss"></style>