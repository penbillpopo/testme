<template>
    <div>
        <div class="toolbar">
            <router-link class="item" :to="Linkaddtest()" >
                <div class="icon icon_test_white"></div>
                <p class="text">Add Test</p>
            </router-link>
            <button type="button" class="item" @click="historyback">
                <div class="icon icon_moveout_white"></div>
                <p class="text">Exit</p>
            </button>
            <button type="button" class="item" v-if="IsItemSelected" @click="DeleteSelected">
                <div class="icon icon_trash_white"></div>
                <p class="text">Delete</p>
            </button>
            <button type="button" class="item" v-if="IsOneTestSelected" @click="EditTest">
                <div class="icon icon_edit_white"></div>
                <p class="text">Edit</p>
            </button>
            <button type="button" class="item" v-if="IsItemSelected" @click="MoveToFolder">
                <div class="icon icon_folderout_white"></div>
                <p class="text">Move</p>
            </button>
        </div>
        <div class="filecontainer w1200" @click="ClearItemActive">
            <div class="filebox">
                <div class="headbar">
                    <h6 class="title">{{foldername}}</h6>
                    <div class="select_filter">
                        <select v-model="testFilter" @change="LoadFolderData">
                            <option>Created</option>
                            <option>Modified</option>
                            <option>Correctrate</option>
                        </select>
                        <button type="button" :class="{islowtohigh:testAsc}"
                        @click="[testAsc=!testAsc, LoadFolderData($event)];"></button>
                    </div>
                </div>
                <div class="fileitembox">
                    <div class="fileitem" v-for="(item,index) in tests" :key="index"
                        :class="{active:item.active}"
                        @click.stop="TestClick($event,index)" 
                        @dblclick="OpenTestLB(index)">
                        <div class="titlefield">
                            <div class="title">
                                <div class="icon icon_test_black"></div>
                                <p class="text">{{item.name}}</p>
                            </div>
                        </div>
                        <div class="detailfield">
                            <small class="text">questions: {{item.questions}}</small>
                            <small class="text">mode: {{item.mode}}</small>
                            <small class="text">correctrate: {{item.correctrate}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <testLB v-if="IsTestLB" :testid="opentestid" :testtitle="opentesttitle" @updatedata="LoadFolderData"></testLB>
    </div>
</template>

<script>
import testLB from '@/components/lightbox/testLB.vue';
export default {
    name: 'memberfolder',
    data(){
        return {
            tests:[],
            foldername:this.$route.params.foldername,
            opentestid:'',
            opentesttitle:'',
            testFilter:'Created',
            testAsc:true,
        }
    },
    mounted(){
        this.LoadFolderData();
    },
    methods:{
        LoadFolderData(){
            this.$http.post(this.$store.state.dbhost+'/testmedb/api/member/getfolder.php',JSON.stringify({
                "folderid": this.$route.params.folderid,
                "testorderby":this.testFilter,
                "testasc":this.testAsc
            })).then((response) => {    
                console.log(response.data);           
                this.tests = [];
                response.data.forEach(element => {
                    this.tests.push({
                        id:element.id,
                        name:element.name,
                        mode:element.mode,
                        questions:element.questions,
                        correctrate:element.correctrate,
                        createdate:element.createdate,
                        modifydate:element.modifydate,
                        active:false,
                    });
                });
            });
        },
        ClearItemActive(){
            for (let item of this.tests) {
                item.active = false;
            }
        },
        TestClick(e,_index){
            if(!e.shiftKey && !e.ctrlKey){
                this.ClearItemActive();
            }
            this.tests[_index].active = true;
        },
        OpenTestLB(_index){
            this.opentestid = this.tests[_index].id;
            this.opentesttitle = this.tests[_index].name;
            this.$store.dispatch('updateTestLBOpen',true);
        },
        Linkaddtest(){
            return '/member/testEdit/'+'0/'+this.$route.params.folderid+'/0';
        },
        GetSelectedItems(){
            let Items = {
                tests:[]
            }
            for (let item of this.tests) {
                if(item.active){
                    Items.tests.push(item.id);
                }
            }
            return Items;
        },
        DeleteSelected(){
            let _this = this;       
            this.swalAlertYN('Yes, delete it!',function(){
                let delfin = function () {
                    _this.LoadFolderData();
                    _this.swalAlertText('Deleted!','Your file has been deleted.',true);
                }
                let selecteditems = _this.GetSelectedItems();                       
                _this.$http.post(_this.$store.state.dbhost+'/testmedb/api/member/deletetest.php',JSON.stringify({
                    "testsid": selecteditems.tests,
                })).then((response) => {
                    if(response.data){
                        delfin();
                    }
                });
            });
        },
        EditTest(){
            let testid = '';
            let testname = '';
            for (let item of this.tests) {
                if(item.active){
                    testid = item.id;
                    testname = item.name;
                }
            }
            this.$router.push('/member/testEdit/'+testname+'/'+this.$route.params.folderid+'/'+testid);
        },
        MoveToFolder(){
            let _this = this;       
            this.swalAlertYN('Yes, Move it!',function(){
                let movefin = function () {
                    _this.LoadFolderData();
                    _this.swalAlertText('Move!','Your file has been Moved.',true);
                }
                let selecteditems = _this.GetSelectedItems();
                _this.$http.post(_this.$store.state.dbhost+'/testmedb/api/member/movetofolder.php',JSON.stringify({
                    "testsid": selecteditems.tests,
                    "folderid": _this.$store.getters.getMemberOutfolderId,
                })).then((response) => {
                    if(response.data){
                        movefin();
                    }
                });
            });
        },
        historyback() {            
            this.$router.go(-1);    
        },
    },
    computed:{
        IsTestLB(){
            return this.$store.getters.getTestLBOpen;
        },
        IsItemSelected(){
            for (let item of this.tests) {
                if(item.active)
                    return true;
            }
            return false;
        },
        IsOneTestSelected(){
            let testnum = 0;
            for (let item of this.tests) {
                if(item.active){
                    testnum++;
                }
            }            
            return testnum==1;
        }, 
    },
    components:{
        testLB,
    }
}
</script>
