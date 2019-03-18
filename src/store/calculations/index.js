// Calculations store

// import {Local} from "../../main";
import fields from "../../../static/form_fields"
import HTTP from '../../plugins/axios'

//state
const state ={
    calculations_progress : [],
    calculation_fiedls:[]
}

//getters
const getters = {
  getCalculations : state => state.calculations_progress,
  getCalculationById: state => id =>{
      return (state.calculations_progress.find(itm => itm.id === id))||[]
  },
  getSomeJsonData : state => {
      return (state.calculations_progress.length) ? state.calculations_progress :null
  },
  getFields: state =>{
      return state.calculation_fiedls
  }

}

//actions
const actions ={

    async getFormFields({commit,dispatch}, payload){
        await HTTP.post('api/CalculationForm').then(response=>{
            commit('setCalculationFields',response.data)
        }).catch(e=>{
            console.log(e.response)
        })
    },

     async createCalculation (context,payload){
        let obj = {
            'id' : payload.id,
            'insurant' : payload.insurant,
            'fields': payload.fields,
            'object':'Объект',
            'status' : 2,
            'status_label':'Ошибка',
            'organization' : payload.organization,
            'responsible' : payload.responsible
        };
         context.commit('setCalculationNew',obj);
    },
    async changeValue({commit},payload){
        commit('editValue',payload)
    },
    async clearCalculation (context,payload){
      context.commit('removeCalculation',payload);
    },
    async addDriverAction({commit},payload){
        commit('addDirever',payload)
    },
    async deleteDriverAction({commit},payload){
        commit('deleteDriver',payload)
    },
    async editObjectAction({commit},payload){
        commit('editTableObject',payload)
    },
    async sendCalculation(context,payload){

    },
    async shiftItem(context){
         context.commit('shiftCalculation');
    }
}


//mutation

const mutations  = {
    setCalculationFields(state,fields){
        state.calculation_fiedls = fields
    },
    setCalculationNew(state,data){
        state.calculations_progress.push(data);
    },
    editValue(state,payload){
        state.calculations_progress.find(itm => itm.id === payload.id).fields.find( field => field.ElementID === payload.field_id).ElementValue=payload.value
    },
    removeCalculation(state,id){
       state.calculations_progress.splice(state.calculations_progress.indexOf(state.calculations_progress.find(itm=>itm.id===id)),1);
    },
    addDirever(state,payload){
      if (state.calculations_progress.find( itm => itm.id === payload.id).drivers){
          state.calculations_progress.find( itm => itm.id === payload.id).drivers.push(payload.object)
      }else{
          state.calculations_progress.find( itm => itm.id === payload.id).drivers=[]
          state.calculations_progress.find( itm => itm.id === payload.id).drivers.push(payload.object)
      }
    },
    deleteDriver(state,payload){
        let old_number = state.calculations_progress.find( itm => itm.id === payload.id).drivers[payload.index].object.match(/\d+$/)[0]
        state.calculations_progress.find( itm => itm.id === payload.id).drivers.splice(payload.index,1)
        state.calculations_progress.find( itm => itm.id === payload.id).drivers.forEach( itm => {
            if ((Number(itm.object.match(/\d+/)[0])-1) > 0 && (Number(itm.object.match(/\d+/)[0])>old_number)) {
               itm.object = itm.object.replace(itm.object.match(/\d+/)[0], Number(itm.object.match(/\d+/)[0]) - 1)
            }
        })
    },
    editTableObject(state,payload){
      state.calculations_progress.find( itm => itm.id === payload.id).drivers[payload.index][payload.key]=payload.value
    },
    shiftCalculation(state){
        state.calculations_progress.shift();
    }


}

export default {
    namespaced :true,
    state,
    getters,
    actions,
    mutations
}
