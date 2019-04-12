import  HTTP  from '../../plugins/axios'
import router from '../../router'
//state from server
const state ={
    calculations_all : [],
    total:0,
    current_obj:null
}

//getters
const getters = {
    getCalculations_server : state => state.calculations_all,
    getTotal_server: state => state.total,
    getCurrent: state => state.current_obj
}

//actions
const actions ={
    async getServerCalculations({ commit }, payload) {
        await HTTP.post('api/Calculations', { product: 1, pagination:payload.pagination, search:payload.search })
            .then( response => {
                commit('setServerCalculations',response.data)
            }).catch(e => {
                console.log(e)
            })
    },
    async getCurrentItem({ commit }, payload) {
        await HTTP.post('api/singleCalculation',{id:Number(payload)})
            .then(response => {
               commit ('setCurrent', response.data)
            }).catch(e =>{
                console.log(e)
            })
    }
}


//mutation

const mutations  = {
    setServerCalculations(state, payload) {
        state.calculations_all = payload.result
        state.total = payload.totalNumber
    },
    setCurrent (state, payload) {
        state.current_obj = payload
    }

}

export default {
    namespaced :true,
    state,
    getters,
    actions,
    mutations
}
