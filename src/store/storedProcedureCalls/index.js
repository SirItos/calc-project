import  HTTP  from '../../plugins/axios'
import router from '../../router'


const state={
    emptyFields:{},
    enumList:{}
}

const getters={
    getStoreList: state => name => {
        return state[name]
    },
    getOneRecod: state => (id,name) => {
        return state[name].find(item => item.id===id)
    },
    getItemStatus: state =>(id,name)=>{
        console.log( (state[name].find(item =>item[name+'_ID']===id).status)|| state[name].find(item =>item[name+'ID']===id).status)
        return (state[name].find(item =>item[name+'_ID']===id).status)
    },
    getEmpty: state => name=> {
        return state.emptyFields[name]
    },
    getEnumList: state => name=>{
        return state.enumList[name]
    }
}
//getListStoredPorcedur

const actions={
    async getList (context, payload){
        await HTTP.post('api/getListStoredPorcedur',{
            st_method:payload.procedure
        }).then(response=>{

            response.data.forEach(item =>{
                item.status=response.status
            })
            let commitData={
                name:payload.procedure,
                data:response.data
            }
            context.commit('setDick',commitData);
        }).catch((e,response)=>{
            // context.dispatch(`user/logout`,{},{root:true}) пока не нужна
            console.log(e)
            console.log(response)
        })
    },

    async deleteItemAction({commit,dispatch},payload){
        console.log(payload)
        await HTTP.post('api/deleteDataStoredPorcedur',{st_method:payload.st_method,params_arr:{id:payload.params_arr.id,RecordTimestamp:payload.params_arr.RecordTimestamp}}).then(response=>{
              commit('deleteItem',{name:payload.st_method,id:payload.index})
        }).catch(e=>{
            console.log(e)
            commit('setStatus',{name:payload.st_method,id:payload.id,value:e})
        })
    },

    async createItemAction({commit,dispatch},payload){
        let result=payload.params_arr
        await HTTP.post('api/addDataStoredPorcedur',payload).then(response=>{
                result['status']=response.status
                result[payload.st_method+'_ID']=response.data[0].RESULT_VALUE
                result['RecordTimestamp']=response.data[0].TIME_STAMP
                commit('addItem',{name:payload.st_method,data:result})
        }).catch(e=>{

        })
    },
    async editItemAction({commit},payload){
        let result = payload.params_arr
        await HTTP.post('api/editDataStoredPorcedur',payload).then(response=>{
                result.state=response.data[0].TIME_STAMP
              commit('editState',{name:payload.st_method,data:result})
        }).catch(e=>{
            console.log(e)
        })
    },
    async getEmptyColumns({commit},payload){
        await HTTP.post('api/schemeDataStoredPorcedur',payload).then(response=>{

            commit('addEmptyFields',{name:payload.table,data:response.data})
        }).catch(e=>{

        })
    },
    async getEnumListAction({commit},payload){
        await HTTP.post('api/enumListDataStoredPorcedur',payload).then(response=>{
            commit('setEnumList',{
                name:payload.st_method,
                data:response.data
            })
        }).catch(e=>{

        })
    }

}

const mutations  = {
    setDick(state,commitData) {
        state[commitData.name] = commitData.data

    },
    setStatus(state,commitData){
       state[commitData.name][commitData.id].status=commitData.value
    },
    deleteItem(state,commitData){

        state[commitData.name].splice(commitData.id,1)
    },
    addItem(state,commitData){
         state[commitData.name].push(commitData.data)
    },
    editState(state,commitData){
        let com_id=commitData.data[commitData.name+'_ID']
        let state_index= state[commitData.name].indexOf(state[commitData.name].find( (item,index) => {
            return item[commitData.name+'_ID']===com_id
        }))
        for (let item_key in state[commitData.name][state_index]){
            state[commitData.name][state_index][item_key]=commitData.data[item_key]
        }
    },
    addEmptyFields(state,commitData){
        state.emptyFields[commitData.name]=commitData.data
    },
    setEnumList(state,commitData){
        state.enumList[commitData.name]=commitData.data
    }
}


export default {
    namespaced :true,
    state,
    getters,
    actions,
    mutations
}