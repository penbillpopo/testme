

<template>
    <div>
        <div class="toolbar">
            <router-link class="item" :to="Linkaddtest" >
                <div class="icon_test_white"></div>
                <p class="text">Add Test</p>
            </router-link>
            <button type="button" class="item" @click="OpenAddFolderLB">
                <div class="icon_folder_white"></div>
                <p class="text">Add Folder</p>
            </button>
            <button type="button" class="item" v-if="IsItemSelected" @click="DeleteSelected">
                <div class="icon_trash_white"></div>
                <p class="text">Delete</p>
            </button>
        </div>
        <div class="filecontainer w1200" @click="ClearItemActive">
            <div class="filebox">
                <div class="headbar">
                    <h6 class="title">Folder</h6>
                    <button class="btn" type="button">
                        <div class="icon_filter"></div>
                        <p class="text">Filter</p>
                    </button>
                </div>
                <div class="fileitembox">
                    <div class="fileitem" :class="{active:item.active}"
                        @click.stop="FolderClick($event,index)"
                        v-for="(item,index) in folders" :key="index">
                        <div class="titlefield">
                            <div class="title">
                                <div class="icon_folder_black"></div>
                                <p class="text">{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="filebox">
                <div class="headbar">
                    <h6 class="title">Tests</h6>
                    <button class="btn" type="button">
                        <div class="icon_filter"></div>
                        <p class="text">Filter</p>
                    </button>
                </div>
                <div class="fileitembox">
                    <div class="fileitem" :class="{active:item.active}"
                        @click.stop="TestClick($event,index)" 
                        @dblclick="OpenTestLB(index)"
                        v-for="(item,index) in outtests" :key="index">
                        <div class="titlefield">
                            <div class="title">
                                <div class="icon_test_black"></div>
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
        <addfolderLB v-if="IsAddFolderLB" v-on:updatedata="LoadMemberData"></addfolderLB>
        <testLB v-if="IsTestLB" :testid="opentestid"></testLB>
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
            opentestid:''
        }
    },
    created:function(){
        this.LoadMemberData();
    },
    methods:{
        LoadMemberData(){
            this.$http.post('http://localhost/testmedb/api/member.php',JSON.stringify({
                "account": sessionStorage['account'],
                "password": sessionStorage['password']
            })).then((response) => {
                this.$store.dispatch('updateMemberId',response.data.id);
                this.$store.dispatch('updateMemberAccount',response.data.account);
                this.$store.dispatch('updateMemberPassword',response.data.password);
                this.$store.dispatch('updateMemberEmail',response.data.email);
                this.outfolderid = response.data.outfolderid;
                this.folders = [];
                response.data.folders.forEach(element => {
                    this.folders.push({
                        id:element.id,
                        name:element.name,
                        createdate:element.createdate,
                        modifydate:element.modifydate,
                        active:false,
                    });
                });
                this.outtests = [];
                response.data.outtests.forEach(element => {
                    this.outtests.push({
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
            if(!e.shiftKey){
                this.ClearItemActive();
            }
            this.outtests[_index].active = true;
        },
        FolderClick(e,_index){
            if(!e.shiftKey){
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
            this.$swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    let _this = this;
                    let delfin = function () {
                        _this.LoadMemberData();
                        _this.$swal.fire('Deleted!','Your file has been deleted.','success');
                    }
                    if (result.value) {
                        let selecteditems = this.GetSelectedItems();
                        this.$http.post('http://localhost/testmedb/api/member/deletefolder.php',JSON.stringify({
                            "foldersid": selecteditems.folders,
                        })).then((response) => {
                            if(response.data){
                                delfin();
                            }
                        });
                        this.$http.post('http://localhost/testmedb/api/member/deletetest.php',JSON.stringify({
                            "testsid": selecteditems.tests,
                        })).then((response) => {
                            if(response.data){
                                delfin();
                            }
                        });
                    }
                });
        },
        OpenTestLB(_index){
            this.opentestid = this.outtests[_index].id;
            this.$store.dispatch('updateTestLBOpen',true);
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
        IsAddFolderLB(){
            return this.$store.getters.getAddFolderLBOpen;
        },
        IsTestLB(){
            return this.$store.getters.getTestLBOpen;
        },
        Linkaddtest(){
            return '/member/testEdit/'+this.outfolderid+'/0';
        },       
    },
    components:{
        addfolderLB,
        testLB
    }
}
</script>
