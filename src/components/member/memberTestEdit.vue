<template>
    <div>
        <div class="editcontainer w800">
            <button class="backbtn" type="button" @click="historyback">
                <div class="btnicon"></div>
                <p class="text">back</p>
            </button>
            <div class="textfield">
                <h6 class="title">Title</h6>
                <input class="titleinput" type="text" name="testTitle" id="testTitle" v-model="testTitle" placeholder="Please input title of the test">
                <p class="validatelog">{{ validation.firstError('testTitle') }}</p>
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
                                <div class="head">
                                    <h6 class="name">Question</h6>
                                    <div class="radioinput">
                                        <label class="radiolabel">
                                            <p class="text">Text</p>
                                            <input type="radio" v-model="item.quesType" value="text">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="radiolabel">
                                            <p class="text">Img</p>
                                            <input type="radio" v-model="item.quesType" value="img">
                                            <span class="checkmark"></span>
                                        </label>                                    
                                    </div> 
                                </div>
                                <div v-if="item.quesType=='text'">
                                    <input class="testinput" type="text" name="question" v-model="item.quesText">
                                    <p class="validatelog">{{ item.quesText_err }}</p>
                                </div>
                                <div v-if="item.quesType=='img'">
                                    <input class="fileinput" type="file" name="question" @change="ImgFileChange('ques',index,$event)">
                                    <p class="validatelog">{{ item.quesImg_err }}</p>
                                    <div class="imgori" v-if="item.quesImgOri!=''">
                                        <small class="text">Original image</small>
                                        <div class="img" :style="{'background-image':'url('+item.quesImgOri+')'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="inputbox">
                                 <div class="head">
                                    <h6 class="name">Answer</h6>
                                    <div class="radioinput">
                                        <label class="radiolabel">
                                            <p class="text">Text</p>
                                            <input type="radio" v-model="item.ansType" value="text">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="radiolabel">
                                            <p class="text">Img</p>
                                            <input type="radio" v-model="item.ansType" value="img">
                                            <span class="checkmark"></span>
                                        </label>                                    
                                    </div> 
                                </div>
                                <div v-if="item.ansType=='text'">
                                    <input class="testinput" type="text" name="answer" v-model="item.ansText">
                                    <p class="validatelog">{{ item.ansText_err }}</p>
                                </div>
                                <div v-if="item.ansType=='img'">
                                    <input class="fileinput" type="file" name="answer" @change="ImgFileChange('ans',index,$event)">
                                    <p class="validatelog">{{ item.ansImg_err }}</p>
                                    <div class="imgori" v-if="item.ansImgOri!=''">
                                        <small class="text">Original image</small>
                                        <div class="img" :style="{'background-image':'url('+item.ansImgOri+')'}"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="addbtn" type="button" @click="AddTest">
                    <div class="btnicon"></div>
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
import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;
export default {
    name: 'membertestedit',
    data(){
        return {
            testTitle:'',
            quesTests:[],
            modeSelect:'Sequential Order',
            isValidateOnce:false
        }
    },
    mounted(){
        this.setPush(this.quesTests,{
            quesType:'text',
            ansType:'text',
            quesText:'',
            ansText:'',
            quesImg:'',
            ansImg:'',
            quesImgOri:'',
            ansImgOri:'',
            quesText_err:'',
            ansText_err:'',
            quesImg_err:'',
            ansImg_err:'',
        });
        //等於0=>新增;不等於0=>編輯
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
                    this.setPush(this.quesTests,{
                        quesType:element.quesType,
                        ansType:element.ansType,
                        quesText:element.quesText,
                        ansText:element.ansText,
                        quesImg:'',
                        ansImg:'',
                        quesImgOri:element.quesImg,
                        ansImgOri:element.ansImg,
                        quesText_err:'',
                        ansText_err:'',
                        quesImg_err:'',
                        ansImg_err:'',
                    });
                });                
            });
        }
    },
    methods:{
        //將資料推入另一資料陣列並更新到vue
        setPush(_arrdata,_target){
            let curindex = _arrdata.length;
            //先push一個值為{}
            _arrdata.push({});
            //再將_taget內容傳入            
            for (var key in _target) {
                this.$set(_arrdata[curindex],key,_target[key]);
            }
        },
        getBase64(file) {
            return new Promise(function(resolve, reject) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    resolve(reader.result);
                };
                reader.onerror = function (error) {
                    reject(error);
                };
            });
        },
        historyback() {            
            this.$router.go(-1);    
        },
        AddTest(){
            this.setPush(this.quesTests,{
                quesType:'text',
                ansType:'text',
                quesText:'',
                ansText:'',
                quesImg:'',
                ansImg:'',
                quesImgOri:'',
                ansImgOri:'',
                quesText_err:'',
                ansText_err:'',
                quesImg_err:'',
                ansImg_err:'',
            });
        },
        DeleteTests(_index){
            this.quesTests.splice(_index,1);
        },
        ImgFileChange(_type,_index,event){
            switch(_type){
                case "ques":
                    if(event.target.files[0]){
                        let _this = this;
                        this.getBase64(event.target.files[0]).then(function(resolve, reject){
                            if(resolve){
                                _this.quesTests[_index].quesImg = resolve;
                                _this.quesTests[_index].quesImgOri = '';
                            }
                            else{
                                _this.swalAlert(reject,false);
                            }
                        });
                        if(this.isValidateOnce){
                            this.quesTests[_index].quesImg_err='';
                        }
                    }
                    else{
                        this.quesTests[_index].quesImg = '';
                        if(this.isValidateOnce){
                            this.quesTests[_index].quesImg_err='Required';
                        }
                    }
                    break;
                case "ans":
                    if(event.target.files[0]){
                        let _this = this;
                        this.getBase64(event.target.files[0]).then(function(resolve, reject){
                            if(resolve){
                                _this.quesTests[_index].ansImg = resolve;
                                _this.quesTests[_index].ansImgOri = '';
                            }
                            else{
                                _this.swalAlert(reject,false);
                            }
                        });
                        if(this.isValidateOnce){
                            this.quesTests[_index].ansImg_err='';
                        }
                    }
                    else{
                        this.quesTests[_index].ansImg = '';
                        if(this.isValidateOnce){
                            this.quesTests[_index].ansImg_err='Required';
                        }
                    }
                    break;
            }
        },
        validateDynamicData(){
            let ispass = true;
            this.isValidateOnce = true;
            this.quesTests.forEach(item => {
                switch(item.quesType){
                    case "text":
                        if(item.quesText == ''){
                            item.quesText_err = 'Required';
                            ispass = false;
                        }else{
                            item.quesText_err = '';
                        }
                        break;
                    case "img":
                        if(item.quesImg == '' && item.quesImgOri == ''){
                            item.quesImg_err = 'Required';
                            ispass = false;
                        }else{
                            item.quesImg_err = '';
                        }
                        break;
                }
                switch(item.ansType){
                    case "text":
                        if(item.ansText == ''){
                            item.ansText_err = 'Required';
                            ispass = false;
                        }else{
                            item.ansText_err = '';
                        }
                        break;
                    case "img":
                        if(item.ansImg == '' && item.ansImgOri == ''){
                            item.ansImg_err = 'Required';
                            ispass = false;
                        }else{
                            item.ansImg_err = '';
                        }
                        break;
                }                
            });
            return ispass;
        },
        ConfirmTextEdit(){
            let _this = this;           
            this.$validate()
            .then(function(success) {
                if (success && _this.validateDynamicData()) {
                    if(_this.$route.params.testid != 0){
                        //編輯
                        _this.$http.post(_this.$store.state.dbhost+'/testmedb/api/member/edittest.php',JSON.stringify({
                            "testtitle": _this.testTitle,
                            "questests": _this.quesTests,
                            "testid":_this.$route.params.testid,
                            "mode":_this.modeSelect!='Sequential Order',
                        })).then((response) => {
                            if(response.data){
                                //console.log(response.data);
                                _this.$router.go(-1);
                            }
                        });
                    }
                    else{
                        //新增                        
                        _this.$http.post(_this.$store.state.dbhost+'/testmedb/api/member/addtest.php',JSON.stringify({
                            "testtitle": _this.testTitle,
                            "questests": _this.quesTests,
                            "folderid":_this.$route.params.folderid,
                            "mode":_this.modeSelect!='Sequential Order',
                        })).then((response) => {
                            if(response.data){
                                _this.$router.go(-1);
                            }
                        });
                    }
                }
                else{
                    _this.swalAlert('Validation failed',false);
                }
            });
           
        }
    },
    validators: {
        testTitle: function (value) {
            return Validator.value(value).required('Required');
        },
    },
    watch: {
        quesTests: {
            handler: function (arr) {
                if(this.isValidateOnce){
                    arr.forEach(item => {
                        if(item.quesText == ''){
                            item.quesText_err = 'Required';
                        }else{
                            item.quesText_err = '';
                        }
                        if(item.ansText == ''){
                            item.ansText_err = 'Required';
                        }else{
                            item.ansText_err = '';
                        }             
                    });
                }
            },
            deep: true
        }
    },
}
</script>
