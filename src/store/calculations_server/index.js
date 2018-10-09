//state from server
const state ={
    calculations_all : [],
    insurance:[]
}

//getters
const getters = {
    getCalculations_server : state => state.calculations_all,
    getInsurance: state => state.insurance
}

//actions
const actions ={

}


//mutation

const mutations  = {


}

export default {
    namespaced :true,
    state,
    getters,
    actions,
    mutations
}
