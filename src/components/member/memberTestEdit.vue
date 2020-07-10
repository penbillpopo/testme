<template>
    <div>
        <div class="editcontainer w800">
            <button class="backbtn" type="button" @click="historyback">
                <div class="icon"></div>
                <p class="text">back</p>
            </button>
            <div class="textfield">
                <h6 class="title">Title</h6>
                <input class="titleinput" type="text" name="testTitle" id="testTitle" v-model="testTitle" placeholder="Please input title of the test">
            </div>
            <div class="textfield">
                <h6 class="title">Mode</h6>
                <div class="select_mode">
                    <select v-model="modeSelect">
                        <option>Sequential Order</option>
                        <option>Random Order</option>
                    </select>
                </div>
            </div>
            <div class="textfield">
                <h6 class="title">Test</h6>
                <div class="testbox">
                    <div class="testitem" v-for="(item,index) in quesTests" :key="index">
                        <div class="headfield">
                            <p class="num">{{index+1}}</p>
                            <button class="closebtn" v-if="quesTests.length>1" @click="DeleteTests(index)"></button>
                        </div>
                        <div class="inputfield">
                            <div class="inputbox">
                                <h6 class="name">Question</h6>
                                <input class="testinput" type="text" name="question" id="" v-model="item.quesText">
                            </div>
                            <div class="inputbox">
                                <h6 class="name">Answer</h6>
                                <input class="testinput" type="text" name="answer" id="" v-model="item.ansText">
                            </div>
                        </div>
                    </div>
                </div>
                <button class="addbtn" type="button" @click="AddTest">
                    <div class="icon"></div>
                    <p class="text">Add Test</p>
                </button>
            </div>
            <div class="btnfield">
                <button class="confirmbtn" type="button" @click="ConfirmTextEdit">
                    <h5 class="text">Confirm</h5>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'membertestedit',
    data(){
        return {
            testTitle:'',
            quesTests:[
                {
                    quesText:'',
                    ansText:''
                }
            ],
            modeSelect:'Sequential Order'
        }
    },
    created:function () {
        if(this.$route.params.testid != 0){
            //ajax load data
            this.testTitle = this.$route.params.testname;
            this.$http.get(this.$store.state.dbhost+'/testmedb/api/member/getquestion.php',{
                params: {
                    "testid": this.$route.params.testid,
                }
            }).then((response) => {
                this.quesTests = [];
                response.data.forEach(element => {
                    this.quesTests.push({
                        quesText:element.question,
                        ansText:element.answer
                    });
                });                
            });
        }
    },
    methods:{
        historyback() {            
            this.$router.go(-1);    
        },
        AddTest(){
            this.quesTests.push({
                quesText:'',
                ansText:''
            });
        },
        DeleteTests(_index){
            this.quesTests.splice(_index,1);
        },
        ConfirmTextEdit(){
            if(this.$route.params.testid != 0){
                //編輯
                this.$http.post(this.$store.state.dbhost+'/testmedb/api/member/edittest.php',JSON.stringify({
                    "testtitle": this.testTitle,
                    "questests": this.quesTests,
                    "testid":this.$route.params.testid,
                    "mode":this.modeSelect!='Sequential Order',
                })).then((response) => {
                    if(response.data){
                        this.$router.go(-1);
                    }
                });
            }
            else{
                //新增
                this.$http.post(this.$store.state.dbhost+'/testmedb/api/member/addtest.php',JSON.stringify({
                    "testtitle": this.testTitle,
                    "questests": this.quesTests,
                    "folderid":this.$route.params.folderid,
                    "mode":this.modeSelect!='Sequential Order',
                })).then((response) => {
                    if(response.data){
                        this.$router.go(-1);
                    }
                });
            }
        }
    }
}
</script>
