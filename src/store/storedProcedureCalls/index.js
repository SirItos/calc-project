import  HTTP  from '../../plugins/axios'
import router from '../../router'


const state={
    emptyFields:{},
    enumList:{},
    errors:{}
}

const getters={
    getStoreList: state => name => {
        return state[name]
    },
    getOneRecod: state => (id,name) => {
        return state[name].find(item => item.id===id)
    },
    getItemStatus: state => name =>{
        return (state.errors[name]) || null
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
    //Получить список записей для таблицы
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
            context.commit('setError',{
                name:payload.procedure,
                msg:null
            })
            context.commit('setDick',commitData);
        }).catch( e => {
            context.dispatch('ErrorAuth',{table_name:payload.procedure,status:e.response.status})

        })
    },



    //удалить элемент из таблицы (если в элементе нет select'ов или любые его поля не являются массивами/объектами)
    async deleteItemAction({commit,dispatch},payload){
        await HTTP.post('api/deleteDataStoredPorcedur',{st_method:payload.st_method,params_arr:{id:payload.params_arr.id,RecordTimestamp:payload.params_arr.RecordTimestamp}}).then(response=>{
            commit('setError',{
                name:payload.st_method,
                msg:null
            })
              commit('deleteItem',{name:payload.st_method,id:payload.index})
        }).catch(e=>{
            context.dispatch('ErrorAuth',e.response.status)
            commit('setStatus',{name:payload.st_method,id:payload.id,value:e})
        })
    },
    //создать новый  элемент (если в элементе нет select'ов или любые его поля не являются массивами/объектами)
    async createItemAction({commit,dispatch},payload){
        let result=payload.params_arr
        await HTTP.post('api/addDataStoredPorcedur',payload).then(response=>{
                result['status']=response.status
                result[payload.st_method+'_ID']=response.data[0].RESULT_VALUE
                result['RecordTimestamp']=response.data[0].TIME_STAMP
                commit('setError',{
                    name:payload.st_method,
                    msg:null
                })
                commit('addItem',{name:payload.st_method,data:result})
        }).catch(e=>{
            context.dispatch('ErrorAuth',e.response.status)
        })
    },
    //редактировать элемент (если в элементе нет select'ов или любые его поля не являются массивами/объектами)
    async editItemAction({commit,dispatch},payload){
        let result = payload.params_arr
        await HTTP.post('api/editDataStoredPorcedur',payload).then(response=>{
              result.state=response.data[0].TIME_STAMP
                commit('setError',{
                    name:payload.st_method,
                    msg:null
                })
              commit('editState',{name:payload.st_method,data:result})
        }).catch(e=>{
            context.dispatch('ErrorAuth',e.response.status)
        })
    },
    //Получить пустую структуру соответствующую поялм таблицы (колонкам)
    async getEmptyColumns({commit,dispatch},payload){
        await HTTP.post('api/schemeDataStoredPorcedur',payload).then(response=>{
            commit('setError',{
                name:payload.st_method+'_empty',
                msg:null
            })
            commit('addEmptyFields',{name:payload.table,data:response.data})
        }).catch(e=>{
            context.dispatch('ErrorAuth',e.response.status)
            commit('addEmptyFields',{name:payload.table,data:'Ошибка '+e.response.status})
        })
    },
    //Получить данные для выпадающего списка
    async getEnumListAction({commit,dispatch},payload){
        await HTTP.post('api/enumListDataStoredPorcedur',payload).then(response=>{
            commit('setError',{
                name:payload.st_method+'_enum',
                msg:null
            })
            commit('setEnumList',{
                name:payload.st_method+'_enum',
                data:response.data
            })
        }).catch(e=>{
            context.dispatch('ErrorAuth',e.response.status)
        })
    },
    async getListGroupSelect (context, payload){
        await HTTP.post('api/getListSelectDataStoredPorcedur',{
            st_method:payload.procedure,
            grouping:payload.grouping,
            fields_to_merge:payload.fields_to_merge
        }).then(response=>{
            response.data.forEach(item =>{
                item.status=response.status
            })
            let commitData={
                name:payload.procedure,
                data:response.data
            }
            context.commit('setError',{
                name:payload.st_method,
                msg:null
            })
            context.commit('setDick',commitData);
        }).catch(e => {
            context.dispatch('ErrorAuth',e.response.status)
        })
    },
    async edtiItemWithSelect({commit,dispatch},payload){
        await HTTP.post('api/editListSelectDataStoredPorcedur',{
                st_method:payload.st_method,
                params: payload.params_arr,
                cic_arr:payload.cic_arr,
                find_in:payload.find_in
        }).then(response=>{
            commit('setError',{
                name:payload.st_method,
                msg:null
            })
        }).catch(e => {
            dispatch('ErrorAuth',e.response.status)
        })
    },
    async deleteItemActionList({commit,dispatch},payload){
        await HTTP.post('api/deleteListSelectDataStoredPorcedur',{st_method:payload.st_method,params_arr:{id:payload.params_arr.id,RecordTimestamp:payload.params_arr.RecordTimestamp}}).then(response=>{
            commit('setError',{
                name:payload.st_method,
                msg:null
            })
            commit('deleteItem',{name:payload.st_method,id:payload.index})
        }).catch(e=>{
            dispatch('ErrorAuth',e.response.status)
            commit('setStatus',{name:payload.st_method,id:payload.id,value:e.response.status})
        })
    },
    async createItemActionList({commit,dispatch},payload){
        let result=payload.params_arr
        await HTTP.post('api/addListSelectDataStoredPorcedur',payload).then(response=>{
            response.data.forEach( itm =>{
                result['status']=response.status
                result[payload.st_method+'_ID'].push(response.data[0].RESULT_VALUE)
                result['RecordTimestamp'].push(response.data[0].TIME_STAMP)
            })
            commit('setError',{
                name:payload.st_method,
                msg:null
            })
            commit('addItem',{name:payload.st_method,data:result})
        }).catch(e=>{
            dispatch('ErrorAuth',e.response.status)
        })
    },



    async ErrorAuth ({commit,dispatch},payload){
         let msg
         switch (payload.status){
             // case 401:
             //     dispatch(`user/logout`,{},{root:true})
             //     break
             case 401:
                 msg= 'Отказано в доступе'
                 break
             case 408:
                 msg= 'Превышено время ожидания ответа от сервер'
                 break
             case 500:
                 msg= 'Внутренняя ошибка сервера'
                 break
             case 503:
                 msg= 'Сервис недоступен'
                 break
             case 502:
                 msg= 'Ошибка шлюза'
                 break
             default:
                 msg= 'Что-то пошлно не так'
                 break
        }
        commit('setError',{
            name:payload.table_name,
            msg:msg
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
    },
    setError (state, commitData){
        if (commitData.msg) {
            state.errors[commitData.name] = commitData.msg
        }else{
            delete state.errors[commitData.name]
        }
    }
}


export default {
    namespaced :true,
    state,
    getters,
    actions,
    mutations
}