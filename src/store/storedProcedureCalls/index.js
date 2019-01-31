import  HTTP  from '../../plugins/axios'
import router from '../../router'


const state={
    insurPeriod:{}
}

const getters={
    getStoreList: state => name => {
        return state[name]
    },
    getOneRecod: state => (id,name) => {
        return state[name].find(item => item.id===id)
    }
}
//getListStoredPorcedur

const actions={
    async getList (context, payload){
        await HTTP.get('api/getListStoredPorcedur').then(response=>{
            response.data.forEach(item =>{
                item.status=response.status
            })
            let commitData={
                name:payload,
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
        await HTTP.post('api/deleteDataStoredPorcedur',{id:payload.id,RecordTimestamp:payload.RecordTimestamp}).then(response=>{
              console.log(response)
              commit('deleteItem',response.data.id)
        }).catch(e=>{
            console.log(e)
            commit('setStatus',{name:payload.name,id:payload.id,value:e})
        })
    }

}

const mutations  = {
    setDick(state,commitData){
        state[commitData.name]=commitData.data
    },
    setStatus(state,commitData){
       state[commitData.name][commitData.id].status=commitData.value
    },
    deleteItem(state,commitData){
        state[commitData.name].splice(commitData.id,1)

    }
}


export default {
    namespaced :true,
    state,
    getters,
    actions,
    mutations
}