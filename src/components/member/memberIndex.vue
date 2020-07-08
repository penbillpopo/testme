

<template>
    <div>
        <div class="toolbar">
            <router-link class="item" to="/member/testEdit">
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
                        v-for="(item,index) in outfolders" :key="index">
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
                    <div class="fileitem" v-for="(item,index) in outtests" :key="index">
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
    </div>
</template>

<script>
import addfolderLB from '@/components/lightbox/addfolderLB.vue'
export default {
    name: 'memberindex',
    data(){
        return{
            outfolders:[],
            outtests:[],
        }
    },
    mounted:function(){
        this.LoadMemberData();
    },
    methods:{
        LoadMemberData(){
            this.$http.post('http://localhost/testmedb/api/member.php',JSON.stringify({
                "account": sessionStorage['account'],
                "password": sessionStorage['password']
            })).then((response) => {
                console.log(response.data);
                this.$store.dispatch('updateMemberId',response.data.id);
                this.$store.dispatch('updateMemberAccount',response.data.account);
                this.$store.dispatch('updateMemberPassword',response.data.password);
                this.$store.dispatch('updateMemberEmail',response.data.email);
                this.outfolders = [];
                response.data.outfolders.forEach(element => {
                    this.outfolders.push({
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
                        name:element.name,
                        mode:element.mode,
                        questions:element.questions,
                        correctrate:element.correctrate,
                        createdate:element.createdate,
                        modifydate:element.modifydate
                    });
                });
            });
        },
        OpenAddFolderLB(){
            this.$store.dispatch('updateAddFolderLBOpen',true);
        },
        ClearItemActive(){
            for (let item of this.outfolders) {
                item.active = false;
            }
        },
        FolderClick(e,_index){
            if(!e.shiftKey){
                this.ClearItemActive();
            }
            this.outfolders[_index].active = true;
        },
        GetSelectedItems(){
            let Items = {
                folders:[],
                tests:[]
            }
            for (let item of this.outfolders) {
                if(item.active){
                    Items.folders.push(item.id);
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
                    if (result.value) {
                        let selecteditems = this.GetSelectedItems();
                        this.$http.post('http://localhost/testmedb/api/member/deletefolder.php',JSON.stringify({
                            "foldersid": selecteditems.folders,
                            "testsid": selecteditems.tests,
                        })).then((response) => {
                            console.log(response);
                            if(response.data){
                                this.LoadMemberData();
                                this.$swal.fire('Deleted!','Your file has been deleted.','success');
                            }
                        });
                    }
                });
        }
    },
    computed:{
        IsItemSelected(){
            for (let item of this.outfolders) {
                if(item.active)
                    return true;
            }
            return false;
        },
        IsAddFolderLB(){
            return this.$store.getters.getAddFolderLBOpen;
        },
    },
    components:{
        addfolderLB
    }
}
</script>
