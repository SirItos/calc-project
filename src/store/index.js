// Store for SPA
// import libs

import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// import  store modules
import user from './user'
import calculations from './calculations'
import calculations_server from './calculations_server'
import storedProcedure from './storedProcedureCalls'




//Vuex+localStorage plugin init
//User info state+localstorage
const vuexLocalSUser = new VuexPersistence({
    key:'user',
    storage:window.localStorage,
    reducer: (state) =>({
        user: state.user,

    }),
     filter: (mutation) =>(mutation.type === "user/setAuth" ||
                          mutation.type === "user/setToken" ||
                          mutation.type === "user/setUserData"),
     modules:['user']
})
//Calculation_local_info
const vuexLocalCalculations = new VuexPersistence({
    key:'calculations',
    storage:window.localStorage,
    reducer: (state) =>({
        calculations: state.calculations
    }),
     filter: (mutation) =>(mutation.type === "calculations/setCalculationNew" ||
                           mutation.type === "calculations/removeCalculation" ||
                           mutation.type === "calculations/editValue" ||
                           mutation.type === "calculations/addDirever" ||
                           mutation.type === "calculations/deleteDriver" ||
                           mutation.type === "calculations/editTableObject" ||
                           mutation.type === "calculations/shiftCalculation"
     ),
    modules:['calculations']
})


Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
        calculations,
        user,
        calculations_server,
        storedProcedure
    },
    plugins:[
        vuexLocalSUser.plugin,
        vuexLocalCalculations.plugin]
})

export default store