// Calculations store

// import {Local} from "../../main";
import fields from "../../../static/form_fields"

//state
const state ={
    calculations_progress : [],
}

//getters
const getters = {
  getCalculations : state => state.calculations_progress,
  getCalculationById: state => id =>{
      return (state.calculations_progress.find(itm => itm.id === id))||[]
  },
  getSomeJsonData : state => {
      console.log(1)
      return (state.calculations_progress.length) ? state.calculations_progress :null
  }

}

//actions
const actions ={
     async createCalculation (context,payload){
        let obj = {
            'id' : payload.id,
            'insurant' : payload.insurant,
            'fields': fields,
            'status' : 3,
            'status_label':'Ошибка',
            'organization' : payload.organization,
            'responsible' : payload.responsible
        };
        context.commit('setCalculationNew',obj);
    },
    async clearCalculation (context,payload){
      context.commit('slicecalculation',payload.id);
    },
    async sendCalculation(context,payload){

    },
    async clear(context){
         context.commit('clearCalculations');
    }
}


//mutation

const mutations  = {
    setLocalCalculation(state,calc){
        state.calculations_progress = calc;
        // Local.set('localCalculations',calc,{ttl:60*60});
    },
    setCalculationNew(state,data){
    state.calculations_progress.push(data);
        // Local.set('localCalculations', state.calculations,{ttl:60*60});
    },
    setFieldValue(state,data){
      state.calculations_progress[data.index].fields[data.key].fields[data.field_index].value=data.val;
    },
    setDireverField(state,data){
      state.calculations_progress[data.index].fields.drivers.table_items[data.field_index][data.key]=Number(data.val);
    },
    removeCalculation(state,id){
        state.calculations_progress.splice(state.calculations_progress.indexOf(state.calculations_progress.find(itm=>itm.id===id)),1);
    },
    edtiInsuranse(state,data){
        state.calculations_progress[state.calculations_progress.indexOf(state.calculations_progress.find(itm=>itm.id===data.id))].insurant=data.ins;
    },
    addDriver(state,data){
        state.calculations_progress[data.index].fields.drivers.table_items.push(data.driver);
    },
    deleteDriver(state,data){
        state.calculations_progress[data.index].fields.drivers.table_items.splice(data.driver_index,1);
    },
    clearCalculations(state){
        state.calculations_progress=[];
    }


}

export default {
    namespaced :true,
    state,
    getters,
    actions,
    mutations
}
