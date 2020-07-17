<template>
    <LBmodel>
        <template slot="headbar">
            <div class="textfield">
                <h6 class="title">
                    {{testtitle}}
                </h6>
                <h6 class="text">
                    {{currentindex+1}}/{{QuestionCounts}}
                </h6>
            </div>
            <div class="closebtn" @click="CloseTestLB"></div>
        </template>
        <template slot="content">
           <div class="textfield">
                <h4 class="text" v-if="isboardText">
                    {{boardText}}
                </h4>
                <div class="img" v-if="!isboardText" :style="{'background-image':'url('+boardImg+')'}"></div>
            </div>
            <div class="btnfield">
                <div class="ansbtnbox" v-if="isfin">
                    <button class="correct" @click="SaveTest">
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
                </button>
            </div>
        </template>
    </LBmodel>    
</template>

<script>
import LBmodel from '@/components/lightbox/_LBmodel';
export default {
    props: {
        testid:{
            type:String
        },
        testtitle:{
            type:String
        },
        testmode:{
            type:String
        }
    },
    data(){
        return{
            testdata:[],
            order:[],
            currentindex:0,
            isanswer:false,
            isfin:false,
            isboardText:true,
            boardText:'',
            boardImg:'',
        }
    },
    created:function(){
        this.$http.get(this.$store.state.dbhost+'/testmedb/api/member/getquestion.php',{
            params: {
                "testid": this.$props.testid,
            }
        }).then((response) => {
            let orderindex = 0;
            response.data.forEach(element => {
                this.testdata.push({
                    quesType:element.quesType,
                    quesText:element.quesText,
                    ansText:element.ansText,
                    ansType:element.ansType,
                    quesImg:element.quesImg,
                    ansImg:element.ansImg,
                    iscorrect:false
                });
                this.order.push(orderindex);
                orderindex++;
            });
            if(this.$props.testmode == 'Random'){
                this.order = this.shuffle(this.order);
            }
            this.UpdateTest();
        });
    },
    methods:{
        CloseTestLB(){
            this.$store.dispatch('updateTestLBOpen',false);
        },
        ShowAnswer(){
            this.isanswer = true;
            this.UpdateTest();
        },
        Answer(_iscorrect){
            this.testdata[this.order[this.currentindex]].iscorrect = _iscorrect;
            if(this.QuestionCounts == this.currentindex+1){
                this.isfin = true;
            }
            else{
                this.currentindex++;
                this.isanswer = false;
            }
            this.UpdateTest();
        },
        UpdateTest(){
            if(this.QuestionCounts)
                if(this.isfin){
                    this.isboardText = true;
                    this.boardText = "Your correct rate is "+this.CorrectRate+'%';
                }
                else{
                    if(this.isanswer){
                        switch(this.testdata[this.order[this.currentindex]].ansType){
                            case "text":
                                this.isboardText = true;
                                this.boardText = this.testdata[this.order[this.currentindex]].ansText;
                                break;
                            case "img":
                                this.isboardText = false;
                                this.boardImg = this.testdata[this.order[this.currentindex]].ansImg;
                                break;
                        }
                    }else{
                        switch(this.testdata[this.order[this.currentindex]].quesType){
                            case "text":
                                this.isboardText = true;
                                this.boardText = this.testdata[this.order[this.currentindex]].quesText;
                                break;
                            case "img":
                                this.isboardText = false;
                                this.boardImg =  this.testdata[this.order[this.currentindex]].quesImg;
                                break;
                        }
                    }
                }
            else
                return null;
        },
        SaveTest(){
            this.$http.post(this.$store.state.dbhost+'/testmedb/api/member/setquestion.php',JSON.stringify({
                "testid": this.$props.testid,
                "correctrate": this.CorrectRate+'%'
            })).then((response) => {
                if(response.data){
                    this.$emit('updatedata');
                    this.swalAlert('Save success',true);
                }
            });
        },
        shuffle(arr) {
            var i,j,temp;
            for (i = arr.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            return arr;
        }
    },
    computed:{
        QuestionCounts() {
            return this.testdata.length;
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
    },
    components:{
        LBmodel
    }
}
</script>

<style lang="scss" scoped src="@/assets/scss/components/lightbox/testLB.scss"></style>