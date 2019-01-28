// User store
import { HTTP } from '../../plugins/axios'
//state
const state ={
    user: {},
    is_auth: false,
    token: ''
}



//getters
const getters = {
    getToken: state => state.token,
    isAuth : state => state.is_auth,
    getUserData : state => state.user
}

//actions
const actions ={
    async login (context, payload){
        let self=this;
        await HTTP.post('api/login',{
            login:payload.login,
            password:payload.password,
            app_name:payload.app_name
        }).then(response=>{
            context.commit('setAuth',true);
            context.commit('setToken',response.data['access_token']);
            HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + response.data['access_token'];
        }).catch(e =>{
            console.log('error');
            console.log(e);
        })
    },

    async loginlocal ({getters,commit,dispatch}){
        if (getters.isAuth){
            commit('SignIn');
        }
    },

    async getUserData(context){
        let self=this;
        await HTTP.get('api/getUserData').then(response=>{
            context.commit('setUserData',response.data);
        }).catch(e=>{
            console.log('error with GetUserData: '+e);
        })
    },
    async logout (context){

        context.commit('setAuth',false);
        context.commit('setToken','');
        context.commit('setUserData',{});
    }
}

//mutation

const mutations  = {
    setAuth(state,val){
        state.is_auth=val;
    },
    setToken(state,token){
        state.token=token
    },
    setUserData(state,data){
        state.user=data;
    }
}

export default {
    namespaced :true,
    state,
    getters,
    actions,
    mutations
}
