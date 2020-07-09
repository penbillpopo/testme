<template>
    <div>
        <div class="toolbar">
             <router-link class="item" :to="Linkaddtest()" >
                <div class="icon_test_white"></div>
                <p class="text">Add Test</p>
            </router-link>
            <button type="button" class="item" v-if="IsItemSelected" @click="DeleteSelected">
                <div class="icon_trash_white"></div>
                <p class="text">Delete</p>
            </button>
        </div>
        <div class="filecontainer w1200" @click="ClearItemActive">
            <div class="filebox">
                <div class="headbar">
                    <h6 class="title">{{foldername}}</h6>
                    <button class="btn" type="button">
                        <div class="icon_filter"></div>
                        <p class="text">Filter</p>
                    </button>
                </div>
                <div class="fileitembox">
                    <div class="fileitem" v-for="(item,index) in tests" :key="index"
                        :class="{active:item.active}"
                        @click.stop="TestClick($event,index)" 
                        @dblclick="OpenTestLB(index)">
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
        }
    },
    created:function(){
        this.LoadFolderData();
    },
    methods:{
        LoadFolderData(){
            this.$http.get('http://localhost/testmedb/api/member/getfolder.php',{
                params: {
                    "folderid": this.$route.params.folderid,
                }
            }).then((response) => {               
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
            if(!e.shiftKey){
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
            return '/member/testEdit/'+this.$route.params.folderid+'/0';
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
                        _this.LoadFolderData();
                        _this.$swal.fire('Deleted!','Your file has been deleted.','success');
                    }
                    if (result.value) {
                        let selecteditems = this.GetSelectedItems();                       
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
    },
    components:{
        testLB,
    }
}
</script>
