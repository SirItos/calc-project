<template>

    <v-card ref="card_modal" class="card_trs">
        <div class="data-table-preloader" v-if="preload">
            <v-progress-circular
                    :size="100"
                    color="info"
                    indeterminate
            ></v-progress-circular>
        </div>
        <v-card-title class="headline">{{(mode)?'Добаввление':'Редактирование'}}
        </v-card-title>
        <v-card-text>
            <v-form ref="fmodal" v-model="valid" lazy-validation>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <field_create v-for="(field,index) in field_set" :data_value="field_set" :key="index" :data_type="check_type(index)" :data_header="index" v-if="check(index)" @wasedit="was_edit=true" ></field_create>
                    </v-layout>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions style="flex-wrap:wrap">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close_modal()"  :disabled="show_confirm_cmp">Закрыть</v-btn>
            <v-btn color="blue darken-1" flat  @click="save_modal()"  :disabled="show_confirm_cmp">Сохранить</v-btn>
            <transition name="fade" mode="out-in">
                <div v-if="show_confirm_cmp" style="width:100%; flex-wrap:wrap" class="d-flex justify-end mt-2 " >
                    <div class="headline mr-5 text-md-right blue--text" style="width:100% ">Вы уверены?</div>

                    <v-btn color="blue darken-1" flat @click="show_confirm_gr=false" class="shur_btn">Нет</v-btn>
                    <v-btn color="blue darken-1" flat  @click="close_modal_window()" class="shur_btn">Да</v-btn>

                </div>
            </transition>
        </v-card-actions>
    </v-card>



</template>

<script>
    import field_create from './field_filial_area'
    import {mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        name: "modal_filial",
        props:{
            mode:{type:Boolean,default:false},
            field_set:{type:Object,default:()=>{return {}}},
            table_name:{type:String,default:''}
        },
        data(){
            return{
                was_edit:false,
                show_confirm_gr:false,
                valid:true,
                preload:false,
            }
        },
        components:{
            field_create
        },
        computed:{
            ...mapGetters({
                getItemStatus:'storedProcedure/getItemStatus',

            }),

            show_confirm_cmp(){
                return this.was_edit && this.show_confirm_gr
            }
        },
        mounted(){
            this.$nextTick(async function(){


            })
        },
        methods:{
            ...mapActions({
                addItemAction: "storedProcedure/createItemActionList",
                editItemAction: "storedProcedure/edtiItemWithSelect",

            }),


            check(item) {
                return (item.indexOf('ID') < 0 && item.indexOf('Record') < 0 && item.indexOf('status') < 0 && item.indexOf('type')<0)
            },

            close_modal(){
                if (this.was_edit){
                    this.show_confirm_gr=true
                }else{
                    this.close_modal_window()
                }
            },

            close_modal_window(){
                this.show_confirm_gr=false
                this.was_edit=false
                this.valid=true;
                this.$emit('dialog_close',false)
            },

            async save_modal(){
                if (this.$refs.fmodal.validate()) {
                    this.preload=true;
                    (this.mode) ? await this.edit_item() : await this.create_new_item();
                }

            },
            async edit_item(){
                await this.editItemAction({
                    st_method:this.getMethodName(),
                    params_arr:{
                        FilialInsuranceArea_ID:this.field_set.FilialInsuranceArea_ID,
                        InsuranceArea_ID:this.field_set.InsuranceArea_ID,
                        Filial_ID:this.field_set.Filial_ID,
                        "Дата начала":this.field_set['Дата начала'], //косяпорищеееее..... ну такие данные приходят с бд
                        "Дата окончания":this.field_set['Дата окончания'], //косяпорищеееее..... ну такие данные приходят с бд
                        RecordTimestamp: this.field_set.RecordTimestamp,
                        type:this.field_set.type
                    },

                    cic_arr:this.field_set.InsuranceArea_ID,
                    find_in:'InsuranceArea_ID',
                    grouping:'Filial_ID',
                    fields_to_merge:[
                        'FilialInsuranceArea_ID',
                        'RecordTimestamp',
                        'InsuranceArea_ID',
                        'InsuranceArea_Территория страхования'
                    ]

                })
                this.resultAddEdit('изменен.')
            },

            async create_new_item(){
                await this.addItemAction({
                    st_method:this.getMethodName(),
                    field_to_search:'InsuranceArea_ID',
                    params_arr:{
                        FilialInsuranceArea_ID:this.field_set.FilialInsuranceArea_ID,
                        InsuranceArea_ID:this.field_set.InsuranceArea_ID,
                        Filial_ID:this.field_set.Filial_ID,
                        "Дата начала":this.field_set['Дата начала'], //косяпорищеееее..... ну такие данные приходят с бд
                        "Дата окончания":this.field_set['Дата окончания'], //косяпорищеееее..... ну такие данные приходят с бд
                        RecordTimestamp: this.field_set.RecordTimestamp,
                        type:this.field_set.type
                    },
                    fields_with_arr:[
                        'InsuranceArea_ID'
                    ]
                })
                this.resultAddEdit('добавлен.')

            },
            resultAddEdit(text){
                if(this.getItemStatus(this.field_set[this.getMethodName()+'_ID'],this.getMethodName())===200){
                    this.preload=false
                    this.$emit('resultHTTP',{color:'success',text:'Элемент '+this.field_set[Object.keys(this.field_set)[1]]+' '+text})
                    this.close_modal_window()
                }
            },
            getMethodName(){
                return Object.keys(this.field_set)[0].replace('_ID','').replace('ID','')
            },
            check_type(item){
                let split =item.split('_')
                let result =null
                result =(split[1])?'select':this.field_set.type[item];
                return result
            }



        }



    }
</script>


<style >

    .shur_btn{
        flex:0 0 auto!important
    }
    .fade-enter-active, .fade-leave-active {
        transition: .2s;
    }
    .fade-enter, .fade-leave-to  {
        transform:translateY(-10px);
        opacity: 0;
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

</style>