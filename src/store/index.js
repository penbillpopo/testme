import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        dbhost:"http://localhost",
        data:{
            member:{
                id:null,
                account:null,
                password:null,
                email:null,
                outfolderid:null,
            }
        },
        page:{
            login:{
                isLoginLBOpen:false,
                isRegistLBOpen:false,
                isForgotLBOpen:false
            },
            member:{
                isAddFolderLBOpen:false,
                isTestLBOpen:false,
            }
        }
    },
    actions:{
        updateMemberId(context,payload){
            context.commit('MemberId',payload);
        },
        updateMemberAccount(context,payload){
            context.commit('MemberAccount',payload);          
        },
        updateMemberPassword(context,payload){
            context.commit('MemberPassword',payload);
        },
        updateMemberEmail(context,payload){
            context.commit('MemberEmail',payload);
        },
        updateMemberOutfolderId(context,payload){
            context.commit('MemberOutfolderId',payload);
        },
        updateLoginLBOpen(context,payload){
            context.commit('LoginLBOpen',payload);
        },
        updateRegistLBOpen(context,payload){
            context.commit('RegistLBOpen',payload);
        },
        updateForgotLBOpen(context,payload){
            context.commit('ForgotLBOpen',payload);
        },
        updateAddFolderLBOpen(context,payload){
            context.commit('AddFolderLBOpen',payload);
        },
        updateTestLBOpen(context,payload){
            context.commit('AddTestLBOpen',payload);
        },
    },
    getters:{
        getMemberId(state){
            return state.data.member.id;
        },
        getMemberAccount(state){
            return state.data.member.account;            
        },
        getMemberPassword(state){
            return state.data.member.password;        
        },
        getMemberEmail(state){
            return state.data.member.email;
        },
        getMemberOutfolderId(state){
            return state.data.member.outfolderid;
        },
        getLoginLBOpen(state){
            return state.page.login.isLoginLBOpen;
        },
        getRegistLBOpen(state){
            return state.page.login.isRegistLBOpen;
        },
        getForgotLBOpen(state){
            return state.page.login.isForgotLBOpen;
        },
        getAddFolderLBOpen(state){
            return state.page.member.isAddFolderLBOpen;
        },
        getTestLBOpen(state){
            return state.page.member.isTestLBOpen;
        },
    },
    mutations:{
        MemberId(state,payload){
            state.data.member.id = payload;
        },
        MemberAccount(state,payload){
            state.data.member.account = payload;
        },
        MemberPassword(state,payload){
            state.data.member.password = payload;
        },
        MemberEmail(state,payload){
            state.data.member.email = payload;
        },
        MemberOutfolderId(state,payload){
            state.data.member.outfolderid = payload;
        },
        LoginLBOpen(state,payload){
            state.page.login.isLoginLBOpen = payload;
        },
        RegistLBOpen(state,payload){
            state.page.login.isRegistLBOpen = payload;
        },
        ForgotLBOpen(state,payload){
            state.page.login.isForgotLBOpen = payload;
        },
        AddFolderLBOpen(state,payload){
            state.page.member.isAddFolderLBOpen = payload;
        },
        AddTestLBOpen(state,payload){
            state.page.member.isTestLBOpen = payload;
        },
    },    
});