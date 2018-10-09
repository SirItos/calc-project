// User store

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
    },

    async loginlocal ({commit,dispatch}){

    },

    async getUserName(context){

    },
    async logout (context){

    }
}

//mutation

const mutations  = {
    setAuth(state){
        state.is_auth=!state.is_auth;
    }
}

export default {
    namespaced :true,
    state,
    getters,
    actions,
    mutations
}
