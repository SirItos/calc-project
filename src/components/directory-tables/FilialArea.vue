<template>
    <v-container fill-height fluid>
        <v-layout wrap>
            <v-flex md12>
                <v-card class="data-table-card">
                    <v-fade-transition>
                        <div class="data-table-preloader" v-if="loading">
                            <v-progress-circular
                                    :size="100"
                                    color="info"
                                    indeterminate
                            ></v-progress-circular>
                        </div>
                    </v-fade-transition>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-text-field
                                append-icon="search"
                                label="поиск"
                                hide-details
                                v-model="search"
                                @click:clear="()=>{this.search=null;this.searchStart()}"
                                clearable
                                @change="searchStart()"
                        >
                        </v-text-field>
                    </v-card-title>
                    <v-data-table
                            :headers="headers"
                            :items="(getDickData(procedure))|| []"
                            :pagination.sync="pagination"
                            class="elevation-1"
                            :rows-per-page-items="[5,10,25]"
                            :total-items="(getTotal(procedure)) || 0"
                    >
                        <!--HEADER OF TABLE-->
                        <template slot="headers" slot-scope="props">
                            <tr>
                                <th
                                        v-for="header in props.headers"
                                        :key="header.text"
                                        v-if="(header.sortable)"
                                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                                        @click="changeSort(header.value)"
                                ><v-icon small>arrow_upward</v-icon>
                                    {{formatheader(header.text)}}</th>
                                <th  style="width:100px!important"  >
                                    <v-btn fab small  flat ripple color="info"  class="data_table_btn"  @click="open_modal(true)">
                                        <v-icon  size="2em" v-if="!loading">mdi-plus</v-icon>
                                    </v-btn>
                                </th>
                            </tr>
                        </template>

                        <!--BODY OF TABLE-->
                        <template slot="items" slot-scope="props">

                            <tr >
                                <td v-for="(cell,index) in props.item" :key="index" v-if="check(index)" class="text-md-center text-sm-center" v-html="array_check(cell,props.item,index)">
                                   </td>
                                <td class="text-md-center text-sm-center px-1" style="width:100px!important">
                                    <v-btn fab small  flat ripple color="info" class="data_table_btn" @click="open_modal(true,true,props.item)" >
                                        <v-icon  >mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn fab small  flat ripple color="info"  class="data_table_btn"  @click="confirm_delete(props.item)">
                                        <v-icon  >mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>


                        <!--NO-DATA VIEW-->
                        <template slot="no-data">
                            <div class="d-flex justify-center align-center row py-5">
                                <v-scroll-y-transition mode="out-in">
                                    <div class="title text-md-center text-sm-center">Нет информации</div>
                                </v-scroll-y-transition>
                            </div>
                        </template>


                        <!--SAERCH RESULT ViEW-->
                        <template slot="no-results">
                            <div class="d-flex justify-center align-center row">
                                Поиск по запросу "{{search}}" ничего не дал.
                            </div>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog persistent max-width="70%" scrollable  v-model="modal" >
            <modal :mode="edit_modal" @dialog_close="close_modal" :field_set="prep_field_set"  @resultHTTP="snack_show" :table_name="procedure"></modal>
        </v-dialog>
        <v-dialog
                v-model="confirm.mode"
                max-width="70%"
        >
            <v-card>
                <div class="data-table-preloader" v-if="confirm.preload">
                    <v-progress-circular
                            :size="100"
                            color="info"
                            indeterminate
                    ></v-progress-circular>
                </div>
                <v-card-title class="headline">Удалить элемент?</v-card-title>

                <v-card-text class="subheading">
                    Вы уверены что хотите удалить {{confirm.text}}?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="grey darken-1"
                            flat="flat"
                            @click="confirm.mode = false"
                    >
                        Отмета
                    </v-btn>

                    <v-btn
                            color="info"
                            flat="flat"
                            @click="deleteItem(confirm.item)"
                    >
                        Да
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar
                v-model="snackbar.mode"
                :color="(snackbar.color)||'error'"

                :timeout=3000
                top
        >
            {{snackbar.text}}
            <v-btn
                    dark
                    flat
                    @click="snackbar.mode = false"
            >
                <v-icon size="2em">mdi-close</v-icon>
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    // название столбцов для этой таблицы.
    import {mapGetters,mapActions} from 'vuex'
    import modal from '../directory-tables/FilialAreaForm/modal'
    export default {
        name: "filial-area",
        components:{
            modal
        },
        props:{
            procedure:{type:String,default:''}
        },
        data:()=>({
            array_data:[],
            headers:[],
            search:null,
            pagination:{
                rowsPerPage:5
            },
            totalNumber:0,
            loading:true,
            modal:false,
            edit_modal:false,
            prep_field_set:{},
            snackbar:{
                mode:false,
                color:'error',
                text:'Snackbar Text'
            },
            confirm:{
                mode:false,
                text:'',
                item:{},
                preload:false
            }
        }),
        created(){
            this.$root.$emit('change_title', 'Территории страхования филиалов')
        },
        // mounted(){
        //     this.$nextTick(async function(){
        //         this.setDataFromServer()
        //
        //     })
        // },
        watch:{
            pagination:{
                handler:function (){
                    this.setDataFromServer()
                },
                deep:true
            }
        },
        computed:{
            ...mapGetters({
                getDickData:'storedProcedure/getStoreList',
                getEmpty:'storedProcedure/getEmpty',
                getItemStatus:'storedProcedure/getItemStatus',
                getTotal:'storedProcedure/getTotalNumber'
            }),

        },
        methods:{
            ...mapActions({
                getList: "storedProcedure/getListGroupSelect",
                deleteItemAction: "storedProcedure/deleteItemActionList",
                actionEmptyFields: "storedProcedure/getEmptyColumns"
            }),
            //МЕТОДЫ ДЛЯ РАБОТЫ С СЕРВЕРОМ (ЧИТАЙ ЗАПРОСЫ!)
            //асинк метод для получения данных с сервера
            //вызываемт vuex action
            async setDataFromServer() {
                this.loading=true
                await this.getList({
                    procedure:this.procedure,
                    grouping:'Filial_ID',
                    fields_to_merge:[
                         this.procedure+'_ID',
                        'RecordTimestamp',
                        'InsuranceArea_ID',
                        'InsuranceArea_Территория страхования'
                    ],
                    pagination:this.pagination,
                    search:this.search
                })
                //Собираем заголовки столбцов
                this.headers=this.headers_set()
                if( this.getItemStatus(this.procedure)){
                    //Выводим snackbar с текстом ошибки
                    this.snack_show({
                        mode: true,
                        color: 'error',
                        text: this.getItemStatus(this.procedure)
                    })
                }
                this.loading = false;

            },

            //асинк метод для вызова action на удаление элемента
            async deleteItem(item){
                this.confirm.preload=true
                let payload={
                    st_method:this.procedure,
                    index:this.list.indexOf(item),
                    params_arr:{
                        id:item.FilialInsuranceArea_ID,
                        RecordTimestamp:item.RecordTimestamp
                    }
                }
                await this.deleteItemAction(payload);
                this.confirm.mode=false
                this.confirm.preload=false
                this.prep_field_set={}
                this.snack_show({
                    mode:true,
                    color: (this.getItemStatus(this.procedure)) ?'error' :'warning',
                    text: (this.getItemStatus(this.procedure)) ? this.getItemStatus(this.procedure) : 'Элемент '+this.confirm.text+' удален.'
                })
            },
            //Получаем пустой набор полей если в пришедших данных изначально ничего нет.
            // Необходимо для создания полей ввода информации в модальном окне..... лучше заменить на статичный набор данных
            // async getEmptyFields(){
            //     if (!this.getEmpty(this.procedure)){
            //         //Если в наборе "пустых" ничего нет, запрашиваем данные с сервера
            //         await  this.actionEmptyFields({table:this.procedure})
            //         //    проверяем ответ от сервера
            //         if (this.getItemStatus(this.procedure+'_empty'))
            //             this.snack_show({
            //                 mode:true,
            //                 color: 'error',
            //                 text: this.getItemStatus(this.procedure+'_empty')+' Схема таблицы не получена'
            //             })
            //     }
            // },


            // ДОПОЛНИТЕЛЬНЫЕ МЕТОДЫ
            open_modal(open,mode=false,fields=null){
                this.modal=open
                this.edit_modal=mode
                this.prep_field_set = ((fields) ? this.clone(fields) : this.create_set())
            },
            //Клонирование полей таблицы для формы добавления/редактирования
            //Необхолдимо для того, чтобы данные в форме не были реактивными
            clone(fields){
                return Object.assign({}, fields);
            },
            //Создание пустого набора данных на основание полей таблицы
            create_set(){
                return {
                    FilialInsuranceArea_ID:[],
                    Filial_ID:'',
                    Filial_Филиал:'',
                    InsuranceArea_ID:[],
                    'InsuranceArea_Территория страхования':[],
                    RecordTimestamp:[],
                    status:200,
                    type:{
                        FilialInsuranceArea_ID:"bigint identity",
                        Filial_ID:"bigint",
                        Filial_Филиал:"nvarchar",
                        InsuranceArea_ID:"bigint",
                        'InsuranceArea_Территория страхования':"nvarchar",
                        RecordTimestamp:"bigint",
                        'Дата начала':"datetime",
                        'Дата окончания':"datetime"
                    },
                    'Дата начала':'',
                    'Дата окончания':''

                }
            },
            //Закрытие модального окна
            close_modal(save=false){
                this.modal=false;
                if (save){
                }else{
                    this.prep_field_set={}
                }
            },

            //Вывод всплывающего окна с информацией
            async snack_show(obj){
                await this.getList({
                    procedure:this.procedure,
                    grouping:'Filial_ID',
                    fields_to_merge:[
                        this.procedure+'_ID',
                        'InsuranceArea_ID',
                        'InsuranceArea_Территория страхования',
                        'RecordTimestamp'
                    ],
                    pagination:this.pagination,
                    search:this.search
                })
                this.list = this.getDickData(this.procedure);
                this.$set(this.snackbar,'color',obj.color)
                this.$set(this.snackbar,'text',obj.text)
                this.$set(this.snackbar,'mode',true)

            },
            //Модальное окно подтверждения действия на удаление
            confirm_delete(item){
                this.$set(this.confirm,'mode',true)
                this.$set(this.confirm,'text',item.Filial_Филиал)
                this.$set(this.confirm,'item',item)
            },


            //ВСПОМОГАТЕЛЬНЫЕ
            //проверка полей и заголовков
            //Выводим только те поля которые удоволетворяют условие
            check(item) {
                return (item.indexOf('ID') < 0 && item.indexOf('Record') < 0 && item.indexOf('status') < 0 && item.indexOf('type')<0)
            },
            async searchStart(){
                if (this.search)
                await this.setDataFromServer();

            },
            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }

            },

            setType(item,index){
                return (item.type[index] !== 'datetime')
            },

            convertToData(strDate,first=false,item='',index=''){
                if (first){
                    this.$set(item,index,this.$moment(strDate,'YYYY-MM-DD').format('YYYY-MM-DD'))
                }
                return this.$moment(strDate,'YYYY-MM-DD').format('DD.MM.YYYY');
            },

            prepName(item){
                return (item.split('_')[1])||item;
            },

            array_check(item,props,index){

               let result=item;
                if (typeof(item)!=='string'){
                    result='';
                   item.forEach( val => {
                       result+="<div>"+val+"</div>";
                   })
                }
                result = (this.setType(props,index))? result : this.convertToData(item,true,props,index)
                return result
            },
            //Составление массива с именами колонок в таблице
            headers_set(){
                let self = this;
                let set=[]
                if (this.getDickData(this.procedure).length) {
                    Object.keys(this.getDickData(this.procedure)[0]).forEach(item => {
                        if (self.check(item)) {
                            set.push({text: item, value: item, align: 'center',sortable:true})
                        }
                    })
                    set.push({text: '', value: '', align: 'center',sortable: false})
                }
                return set
            },
            formatheader(itm){
                if (itm.indexOf('_')>0){
                        return itm.split('_')[1]
                }
                return itm
            }
        }
    }
</script>

<style scoped>
    .data-table-card{
        position: relative;
    }
    .data-table-preloader{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: rgba(250, 250, 250, 0.9);
        z-index:1000;

    }
    .data_table_btn{
        margin:6px 2px;
    }
</style>