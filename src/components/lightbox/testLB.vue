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
                            {{currentindex+1}}/{{QuestionCounts}}
                        </h6>
                    </div>
                    <div class="closebtn" @click="CloseTestLB"></div>
                </div>
                <div class="content">
                    <div class="textfield">
                        <h4 class="text">
                            {{CurrentQuestionText}}
                        </h4>
                    </div>
                    <div class="btnfield">
                        <div class="ansbtnbox" v-if="isfin">
                            <button class="correct">
                                <h6 class="text">Save</h6>
                            </button>
                            <button class="wrong" @click="CloseTestLB">
                                <h6 class="text">Cancel</h6>
                            </button>
                        </div>
                        <div class="ansbtnbox" v-if="isanswer&&!isfin">
                            <button class="correct" @click="Answer(true)">
                                <h6 class="text">Correct</h6>
                            </button>
                            <button class="wrong" @click="Answer(false)">
                                <h6 class="text">Wrong</h6>
                            </button>
                        </div>
                        <button class="checkbtn" type="button" v-if="!isanswer&&!isfin" @click="ShowAnswer">
                            <h6 class="text">></h6>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        testid:{
            type:String
        }
    },
    data(){
        return{
            testtitle:'',
            testdata:[],
            currentindex:0,
            isanswer:false,
            isfin:false,
        }
    },
    created:function(){
        this.$http.get('http://localhost/testmedb/api/member/getquestion.php',{
            params: {
                "testid": this.$props.testid,
            }
        }).then((response) => {
            response.data.forEach(element => {
                this.testdata.push({
                    question:element.question,
                    answer:element.answer,
                    iscorrect:false
                });
            });
            
        });
    },
    methods:{
        CloseTestLB(){
            this.$store.dispatch('updateTestLBOpen',false);
        },
        ShowAnswer(){
            this.isanswer = true;
        },
        Answer(_iscorrect){
            this.testdata[this.currentindex].iscorrect = _iscorrect;
            if(this.QuestionCounts == this.currentindex+1){
                this.isfin = true;
            }
            else{
                this.currentindex++;
                this.isanswer = false;
            }
        }
    },
    computed:{
        QuestionCounts() {
            return this.testdata.length;
        },
        CurrentQuestionText() {
            if(this.QuestionCounts)
                if(this.isfin){
                    return "Your correct rate is "+this.CorrectRate+'%';
                }
                else{
                    return this.testdata[this.currentindex].question;
                }
            else
                return null;
        },
        CorrectRate(){
            let correct = 0;
            if(this.QuestionCounts)
            {
                this.testdata.forEach(element => {
                    if(element.iscorrect)
                        correct++;                    
                });
                return Math.round(correct/this.QuestionCounts*100);
            }               
            else
                return null;
        }
    }
}
</script>

<style lang="scss" scoped src="@/assets/scss/components/testLB.scss"></style>