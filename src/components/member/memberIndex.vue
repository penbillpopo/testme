

<template>
    <div>
        <div class="toolbar" :class="{isFixed:ifFixed}">
            <router-link class="item" :to="Linkaddtest" >
                <div class="icon icon_test_white"></div>
                <p class="text">Add Test</p>
            </router-link>
            <button type="button" class="item" @click="OpenAddFolderLB">
                <div class="icon icon_folder_white"></div>
                <p class="text">Add Folder</p>
            </button>
            <button type="button" class="item" v-if="IsItemSelected" @click="DeleteSelected">
                <div class="icon icon_trash_white"></div>
                <p class="text">Delete</p>
            </button>
            <button type="button" class="item" v-if="IsOneFolderSelected" @click="OpenFolder">
                <div class="icon icon_movein_white"></div>
                <p class="text">Enter</p>
            </button>
            <button type="button" class="item" v-if="IsOneTestSelected" @click="EditTest">
                <div class="icon icon_edit_white"></div>
                <p class="text">Edit</p>
            </button>
            <button type="button" class="item" v-if="IsOneTestSelected" @click="OpenTestLB">
                <div class="icon icon_play_white"></div>
                <p class="text">Play</p>
            </button>
        </div>
        <div class="filecontainer w1200" @click="ClearItemActive">
            <div class="filebox">
                <div class="headbar">
                    <h6 class="title">Folder</h6>
                    <div class="select_filter">
                        <select v-model="folderFilter" @change="LoadMemberData">
                            <option>Created</option>
                            <option>Modified</option>
                        </select>
                        <button type="button" :class="{islowtohigh:folderAsc}"
                        @click="[folderAsc=!folderAsc,LoadMemberData($event)]"></button>
                    </div>
                </div>
                <div class="fileitembox">
                    <div class="fileitem" :class="{active:item.active,isdraped:item.isdrapedin}"
                        @click.stop="FolderClick($event,index)"
                        @dblclick="OpenFolder()"
                        @dragover="FolderDrapedOver($event,index)"
                        @dragleave="FolderDrapedLeave(index)"
                        v-for="(item,index) in folders" :key="index">
                        <div class="titlefield">
                            <div class="title">
                                <div class="icon icon_folder_black"></div>
                                <p class="text">{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="filebox">
                <div class="headbar">
                    <h6 class="title">Tests</h6>
                    <div class="select_filter">
                        <select v-model="testFilter" @change="LoadMemberData">
                            <option>Created</option>
                            <option>Modified</option>
                            <option>Correctrate</option>
                        </select>
                        <button type="button" :class="{islowtohigh:testAsc}"
                        @click="[testAsc=!testAsc, LoadMemberData($event)];"></button>
                    </div>
                </div>
                <div class="fileitembox">
                    <div class="fileitem" draggable="true"
                        @dragstart="TestDragStart($event,index)" 
                        @dragend="TestDragEnd()"
                        :class="{active:item.active,isdraping:item.isdraping}"
                        @click.stop="TestClick($event,index)" 
                        @dblclick="OpenTestLB()"
                        v-for="(item,index) in outtests" :key="index">                        
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
        <addfolderLB v-if="IsAddFolderLB" @updatedata="LoadMemberData"></addfolderLB>
        <testLB v-if="IsTestLB" :testid="opentestid" :testtitle="opentesttitle" :testmode="opentestmode" @updatedata="LoadMemberData"></testLB>
    </div>
</template>

<script>
import addfolderLB from '@/components/lightbox/addfolderLB.vue';
import testLB from '@/components/lightbox/testLB.vue';
export default {
    name: 'memberindex',
    data(){
        return{
            folders:[],
            outtests:[],
            outfolderid:'',
            opentestid:'',
            opentesttitle:'',
            opentestmode:'',
            openfolderid:'',
            openfoldertitle:'',
            drapinfolderid:'',
            folderFilter:'Created',
            testFilter:'Created',
            folderAsc:true,
            testAsc:true,
            scrollDistence: window.scrollY,
            ifFixed: false,
        }
    },
    created: function(){
        window.addEventListener('scroll', this.listenScrollDistence, true);
    },
    mounted(){
        this.LoadMemberData();
    },
    methods:{
        listenScrollDistence: function(){ 
            this.scrollDistence = window.scrollY;
        },
        LoadMemberData(){
            this.$http.post(this.$store.state.dbhost+'/testmedb/api/member.php',JSON.stringify({
                "account": localStorage['account'],
                "password": localStorage['password'],
                "folderorderby":this.folderFilter,
                "folderasc":this.folderAsc,
                "testorderby":this.testFilter,
                "testasc":this.testAsc
            })).then((response) => {
                this.$store.dispatch('updateMemberId',response.data.id);
                this.$store.dispatch('updateMemberAccount',response.data.account);
                this.$store.dispatch('updateMemberPassword',response.data.password);
                this.$store.dispatch('updateMemberEmail',response.data.email);
                this.$store.dispatch('updateMemberOutfolderId',response.data.outfolderid);
                this.outfolderid = response.data.outfolderid;
                this.folders = [];
                response.data.folders.forEach(element => {
                    this.folders.push({
                        id:element.id,
                        name:element.name,
                        createdate:element.createdate,
                        modifydate:element.modifydate,
                        active:false,
                        isdrapedin:false,
                    });
                });
                this.outtests = [];
                response.data.outtests.forEach(element => {
                    this.outtests.push({
                        id:element.id,
                        name:element.name,
                        mode:element.mode=='0'?"Sequential":"Random",
                        questions:element.questions,
                        correctrate:element.correctrate,
                        createdate:element.createdate,
                        modifydate:element.modifydate,
                        active:false,
                        isdraping:false,
                    });
                });
            });
        },
        OpenAddFolderLB(){
            this.$store.dispatch('updateAddFolderLBOpen',true);
        },
        ClearItemActive(){
            for (let item of this.folders) {
                item.active = false;
            }
            for (let item of this.outtests) {
                item.active = false;
            }
        },
        TestClick(e,_index){
            if(!e.shiftKey && !e.ctrlKey){
                this.ClearItemActive();
            }
            this.outtests[_index].active = true;
        },
        FolderClick(e,_index){
            if(!e.shiftKey && !e.ctrlKey){
                this.ClearItemActive();
            }
            this.folders[_index].active = true;
        },
        GetSelectedItems(){
            let Items = {
                folders:[],
                tests:[]
            }
            for (let item of this.folders) {
                if(item.active){
                    Items.folders.push(item.id);
                }
            }
            for (let item of this.outtests) {
                if(item.active){
                    Items.tests.push(item.id);
                }
            }
            return Items;
        },
        DeleteSelected(){
            let _this = this;       
            this.swalAlertYN('Yes, delete it!',function(){
                let selecteditems = _this.GetSelectedItems();
                let d_folder =  _this.$http.post(_this.$store.state.dbhost+'/testmedb/api/member/deletefolder.php',JSON.stringify({
                    "foldersid": selecteditems.folders,
                }));
                let d_test = _this.$http.post(_this.$store.state.dbhost+'/testmedb/api/member/deletetest.php',JSON.stringify({
                    "testsid": selecteditems.tests,
                }));
                Promise.all([d_folder, d_test]).then(function () {
                    _this.LoadMemberData();
                    _this.swalAlertText('Deleted!','Your file has been deleted.',true); 
                });               
            });
        },
        EditTest(){
            let testid = '';
            let testname = '';
            for (let item of this.outtests) {
                if(item.active){
                    testid = item.id;
                    testname = item.name;
                }
            }
            this.$router.push('/member/testEdit/'+testname+'/'+this.outfolderid+'/'+testid);
        },
        MoveToFolder(){
            let _this = this;       
            this.swalAlertYN('Yes, Move it!',function(){
                let selecteditems = _this.GetSelectedItems();
                _this.$http.post(_this.$store.state.dbhost+'/testmedb/api/member/movetofolder.php',JSON.stringify({
                    "testsid": selecteditems.tests,
                    "folderid": _this.drapinfolderid,
                })).then((response) => {
                    if(response.data){
                        _this.LoadMemberData();
                        _this.swalAlertText('Move!','Your file has been Moved.',true);
                    }
                });
            });
        },
        OpenTestLB(){
            let testid = '';
            let testname = '';
            let testmode = '';
            for (let item of this.outtests) {
                if(item.active){
                    testid = item.id;
                    testname = item.name;
                    testmode = item.mode;
                }
            }
            this.opentestid = testid;
            this.opentesttitle = testname;
            this.opentestmode = testmode;
            this.$store.dispatch('updateTestLBOpen',true);
        },
        OpenFolder(){
            let folderid = '';
            let foldername = '';
            for (let item of this.folders) {
                if(item.active){
                    folderid = item.id;
                    foldername = item.name;
                }
            }
            this.openfolderid = folderid;
            this.openfoldertitle = foldername;
            this.$router.push('/member/folder/'+this.openfoldertitle+'/'+this.openfolderid);
        },
        TestDragStart(e,_index){
            //沒有多選被點到時要全部取消active
            if(!this.outtests[_index].active){
                this.outtests.forEach(element => {
                    element.active = false;
                });
            }
            //folder要全部取消active
            this.folders.forEach(element => {
                element.active = false;
            });
            this.outtests[_index].active = true;
        },
        TestDragEnd(){
            if(this.IsTestDrapInFolder)
                this.MoveToFolder();
            //全部folder取消isdrapedin，不能寫在FolderDrapedLeave，事件被prevent擋住
            this.folders.forEach(element => {
                element.isdrapedin = false;
            });
        },
        FolderDrapedOver(e,_index){
            //preventDefault可以使cursor恢復成default
            e.preventDefault();
            if(!this.folders[_index].isdrapedin){
                this.folders[_index].isdrapedin = true;
                this.drapinfolderid = this.folders[_index].id;
            }
        },
        FolderDrapedLeave(_index){
            this.folders[_index].isdrapedin = false;
        }
    },
    watch: {
        scrollDistence: function(){
            if(this.scrollDistence >= 50)
                this.ifFixed = true;
            else
                this.ifFixed = false;
        }
    },
    computed:{
        IsItemSelected(){
            for (let item of this.folders) {
                if(item.active)
                    return true;
            }
            for (let item of this.outtests) {
                if(item.active)
                    return true;
            }
            return false;
        },
        IsOneTestSelected(){
            let testnum = 0;
            for (let item of this.folders) {
                if(item.active)
                    return false;
            }
            for (let item of this.outtests) {
                if(item.active){
                    testnum++;
                }
            }            
            return testnum==1;
        },
        IsOneFolderSelected(){
            let foldernum = 0;
            for (let item of this.outtests) {
                if(item.active){
                    return false;
                }
            }
            for (let item of this.folders) {
                if(item.active){
                    foldernum++;                    
                }
            }
            return foldernum==1;
        },
        IsTestDrapInFolder(){
            let flag = 0;
            this.folders.forEach(element => {
                if(element.isdrapedin)
                    flag = 1;
            });
            return flag;
        },
        IsAddFolderLB(){
            return this.$store.getters.getAddFolderLBOpen;
        },
        IsTestLB(){
            return this.$store.getters.getTestLBOpen;
        },
        Linkaddtest(){
            return '/member/testEdit/'+'0/'+this.outfolderid+'/0';
        },
    },
    components:{
        addfolderLB,
        testLB,
    }
}
</script>
