<template>
    <v-form ref="form" v-model="valid" lazy-validation>
    <v-container fill-height fluid>
        <v-layout  row wrap >

            <!--Начальная информация-->
             <v-flex md12 justify-start class=" subheading">
                 <v-layout  row wrap >
                <v-flex md11 class="pl-3 d-flex" style="min-height: 52px;">Основная информация
                </v-flex>
                     <v-flex md4 sm4 class="pl-4" >
                         <v-tooltip  right v-model="show_tooltip" :disabled="true" nudge-right="80px" nudge-bottom="50px">
                         <v-autocomplete
                                 slot="activator"
                                 v-model="ins"
                                 :items="this.$root.form_field.insur.values"
                                 autocomplete
                                 :label="this.$root.form_field.insur.label"
                                 :prepend-icon="this.$root.form_field.insur.icon"
                                 search-input
                                 @input="insur_change()"
                         >
                             <template slot="no-data">
                                 <v-list-tile>
                                     <v-list-tile-title>
                                         Поиск не принес результатов Т_Т
                                     </v-list-tile-title>
                                 </v-list-tile>
                             </template>
                         </v-autocomplete>
                             <span> Для продолжения выберети "Страхователя"</span>
                         </v-tooltip>
                     </v-flex>
                     <v-flex md1 sm1 class="pl-2 pt-2">
                         <v-btn
                                 ripple
                                 label="button"
                                 flat
                                 disabled
                         >
                             <v-icon size="2em">mdi-plus</v-icon>
                         </v-btn>
                     </v-flex>
                     <v-flex md1 sm1 class=" pt-2">
                         <v-btn
                                 ripple
                                 label="button"
                                 flat
                                 @click="remove_item()"
                                 :disabled="this.ins===undefined"
                         >
                             <v-icon size="2em">mdi-close</v-icon>
                         </v-btn>
                     </v-flex>
                     <v-flex md3 sm3  >
                         <v-fade-transition>
                             <input_group :data_fields="getFieldSet.prolong.fields[0]" :item_index="getCurrentIndex" :item_key="'prolong'" v-if="getFieldSet!==null" :field_index="0">
                             </input_group>
                         </v-fade-transition>
                     </v-flex>
                     <v-flex md3 sm3 >
                         <v-fade-transition>
                             <input_group :data_fields="getFieldSet.prolong.fields[1]" :item_index="getCurrentIndex" :item_key="'prolong'" v-if="getFieldSet!==null" :field_index="1">
                             </input_group>

                         </v-fade-transition>
                     </v-flex>
                 </v-layout>
             </v-flex>
            <!--Группа основных полей ввода-->
            <v-fade-transition>
                 <v-flex md12 justify-start class=" subheading"  v-if="getFieldSet!==null">
                    <v-container class="pt-1 ml-0 mr-0" style="min-width: 100%!important;">
                        <v-layout row wrap>
                            <v-flex md6 sm6 v-for="(item,index) in getFieldSet.main.fields" class="pl-2 pr-2 padding_for_seconds" :key="item.label+'_'+index" >
                                <input_group :data_fields="item" :item_index="getCurrentIndex" :item_key="'main'" :field_index="index">
                                </input_group>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-fade-transition>

            <!--Группа бонус малус-->
            <v-fade-transition>
                <v-flex md6 justify-start class=" subheading" align-content-end v-if="getFieldSet!==null">
                    <v-container class="pt-1">
                        <div>  {{getFieldSet.bonus.title}}</div>
                        <v-layout row wrap >
                            <v-flex md12 sm12 v-for="(item,index)  in getFieldSet.bonus.fields" class="pl-2 pr-2" :key="item.label+'_'+index">
                                <input_group :data_fields="item" :item_index="getCurrentIndex" :item_key="'bonus'" :field_index="index">
                                </input_group>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-fade-transition>

            <!--Количество выплат-->
            <v-fade-transition>
                <v-flex md6 justify-start class=" subheading" align-content-end v-if="getFieldSet!==null">
                    <v-container class="pt-1 pl-0" >
                        <div class="pl-0">  {{getFieldSet.payments.title}}</div>
                        <v-layout row wrap>
                            <v-flex md12 sm12 v-for="(item,index) in getFieldSet.payments.fields" class="pl-2 pr-2" :key="item.label+'_'+index">
                                <input_group :data_fields="item" :item_index="getCurrentIndex" :item_key="'payments'" :field_index="index">
                                </input_group>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-fade-transition>

            <!--Транспортное средство-->
            <v-fade-transition>
                <v-flex md6 justify-start class=" subheading" align-content-end v-if="getFieldSet!==null">
                        <v-container class="pt-1">
                            <div >  {{getFieldSet.ts.title}}</div>
                            <v-layout row wrap>
                                <v-flex md12 sm12 v-for="(item,index) in getFieldSet.ts.fields" class="pl-2 pr-2" :key="item.label+'_'+index">
                                    <input_group :data_fields="item" :item_index="getCurrentIndex" :item_key="'ts'" :field_index="index">
                                    </input_group>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-flex>
            </v-fade-transition>
            <v-fade-transition>
                <v-flex md6 justify-start class=" subheading" align-content-end v-if="getFieldSet!==null">
                   <v-container class="pt-1 pl-0 " >
                            <div class="pl-0" style="min-height: 24px;">  {{getFieldSet.ts_check.title}}</div>
                            <v-layout row wrap>
                                <v-flex md12 sm12 v-for="(item,index) in getFieldSet.ts_check.fields" class="pl-2 pr-2" :class="(item.type!=='check')?'':'pt-3'" :key="item.label+'_'+index" style="min-height: 68px;"  v-if="dop_proof(item)">
                                    <input_group :data_fields="item" :item_index="getCurrentIndex" :item_key="'ts_check'" :field_index="index">
                                    </input_group>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-flex>
            </v-fade-transition>

           <!--Таблица водителей.-->
            <v-fade-transition>
                <v-flex md12 justify-start class=" subheading" align-content-end v-if="getFieldSet!==null">

                        <v-container class="pt-1 ml-0 mr-0" style="width: 100%!important;" >
                            <div  style="min-height: 24px;" class="d-flex">
                               <v-flex md4 sm4>Водители</v-flex>
                                <v-flex offset-md7 offset-sm7 md1 sm1>

                                </v-flex>

                            </div>
                            <v-layout row wrap>
                                <v-flex md12 sm12  class="pl-2 pr-2" style="min-height: 68px;">
                                    <v-data-table
                                     class="elevation-1 mt-3"
                                     :headers="headers"
                                     :items="getFieldSet.drivers.table_items"
                                     hide-actions
                                    >
                                        <template slot="headers" slot-scope="props">
                                            <th
                                                    v-for="header in props.headers"
                                                    v-if="header.value!=='empty'"
                                                    :key="header.text"
                                            >
                                                {{ header.text }}
                                            </th>
                                            <th>
                                                <v-btn fab small flat @click="add_driver_push()">
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </th>
                                        </template>

                                        <template slot="items" slot-scope="props">
                                            <td>{{ props.item.start }}</td>

                                            <td class="td-center">
                                                <v-edit-dialog
                                                        :return-value.sync="props.item.exp"
                                                        lazy
                                                        @save="save(props.item.exp,props.index,'exp')"

                                                >
                                                    {{ (props.item.exp!=="")?props.item.exp:0 }}
                                                    <v-text-field
                                                        slot="input"
                                                        v-model="props.item.exp"
                                                        label=""
                                                        maxlength="2"
                                                        clearable
                                                        single-line
                                                    ></v-text-field>
                                                </v-edit-dialog></td>
                                            <td class="td-center">
                                                <v-edit-dialog
                                                        :return-value.sync="props.item.age"
                                                        lazy
                                                        @save="save(props.item.age,props.index,'age')"
                                                >
                                                    {{ (props.item.age!=="")?props.item.age:0 }}
                                                    <v-text-field
                                                            slot="input"
                                                            v-model="props.item.age"
                                                            label="Рдактирование"
                                                            maxlength="2"
                                                            clearable
                                                            single-line
                                                    ></v-text-field>
                                                </v-edit-dialog></td>
                                            <!--<td class="text-md-center text-sm-center">{{ props.item.age }}</td>-->
                                            <td class="text-md-center text-sm-center">
                                                <v-btn fab small flat @click="delete_driver_call(props.item)" >
                                                    <v-icon class="grey--text" >mdi-delete</v-icon>
                                                </v-btn>
                                            </td>

                                        </template>


                                        <template slot="no-data">
                                           <div class="d-flex justify-center align-center row">
                                               Нет водителей
                                           </div>
                                        </template>

                                    </v-data-table>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-flex>
            </v-fade-transition>

            <!--Дополнительные чек боксы по водителяим-->
            <v-fade-transition>
                <v-flex md12 justify-start class=" subheading" v-if="getFieldSet!==null">
                        <v-container class="pt-1 ml-0 mr-0" style="min-width: 100%!important;">
                            <div class="pl-0" style="min-height: 24px;">  {{getFieldSet.drivers.title}}</div>
                            <v-layout row wrap>
                                <v-flex md6 sm6 v-for="(item,index) in getFieldSet.drivers.fields" class="pl-2 pr-2 padding_for_seconds" :key="item.label+'_'+index">
                                    <input_group :data_fields="item" :item_index="getCurrentIndex" :item_key="'drivers'" :field_index="index" >
                                    </input_group>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-flex>
            </v-fade-transition>

            <!--Дополнительно АГО-->
            <v-fade-transition>
            <v-flex md6 justify-start class=" subheading" align-content-end  v-if="getFieldSet!==null">
                   <v-container class="pt-1 " >
                            <div style="min-height: 24px;">
                                <v-checkbox
                                        :label="getFieldSet.dop_info.title"
                                        v-model="show_dop_fields"
                                        color="primary"
                                >
                                </v-checkbox>
                            </div>
                       <v-fade-transition>
                            <v-layout row wrap v-if="show_dop_fields">
                                <v-flex md12 sm12 v-for="(item,index) in getFieldSet.dop_info.fields" class="pl-4 pr-4" :key="item.label+'_'+index">
                                    <input_group :data_fields="item" :item_index="getCurrentIndex" :item_key="'dop_info'" :field_index="index">
                                    </input_group>
                                </v-flex>
                            </v-layout>
                       </v-fade-transition>
                        </v-container>
                   </v-flex>
            </v-fade-transition>

            <!--Дополнительно НС-->
            <v-fade-transition>
            <v-flex md6 justify-start class=" subheading" align-content-end v-if="getFieldSet!==null">
              <v-container class="pt-1 " >
                        <div style="min-height: 24px;">
                            <v-checkbox
                                    :label="getFieldSet.dop_info_ns.title"
                                    v-model="show_dop_fields_ns"
                                    color="primary"
                            >
                            </v-checkbox>
                        </div>
                  <v-fade-transition>
                        <v-layout row wrap v-if="show_dop_fields_ns">
                            <v-flex md12 sm12 v-for="(item,index) in getFieldSet.dop_info_ns.fields" class="pl-2 pr-2" :key="item.label+'_'+index">
                                <input_group :data_fields="item" :item_index="getCurrentIndex" :item_key="'dop_info_ns'" :field_index="index">
                                </input_group>
                            </v-flex>
                        </v-layout>
                  </v-fade-transition>
                    </v-container>
              </v-flex>
            </v-fade-transition>

            <!--Кнопка "Рассчитать"-->
            <v-fade-transition>
            <v-flex md12 sm12 justify-center class="pa-5" v-if="getFieldSet!==null">
                <v-btn
                        large
                        block
                        color="primary"
                        @click="calc()"
                >Рассчитать</v-btn>
            </v-flex>
            </v-fade-transition>

            <!--Диалог подтверждения-->
            <v-dialog
                    v-model="dialog"
                    max-width="400"
                    persistent
            >
                <v-card>
                    <v-card-title class="headline">
                        Предупреждение!
                    </v-card-title>
                    <v-card-text>
                        В случае удаления "Страхователя" все данные заполенные в форме рассчета будут утеряны.
                        Вы уверены что хотите удалить "Страхователя"?
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="grey darken-1"
                            flat
                            @click="()=>{this.dialog=false;}"
                        >
                            Нет
                        </v-btn>
                        <v-btn
                            color="info"
                            flat
                            @click="()=>{this.dialog=false; this.remove_remove()}"
                        >
                            Да
                        </v-btn>
                    </v-card-actions>
                </v-card>

            </v-dialog>


        </v-layout>
    </v-container>
    </v-form>
</template>

<script>
    import select_item from "./select_item.vue"
    import check_item from "./check-item.vue"
    import input_group from "./input_group.vue"
    import {mapGetters,mapActions,mapMutations} from "vuex"
    export default {
        name: "calculator",
        props:{
          id:{type:String,default:"new"}
        },
        components:{
            input_group,
            check_item,
            select_item
        },
        data(){
          return{
              ins:undefined,
              show_tooltip:true,
              show_dop_fields:false,
              show_dop_fields_ns:false,
              headers: [
                  {
                      text: 'Водители',
                      align: 'left',
                      sortable: false,
                      value: 'start'
                  },
                  { text: 'Стаж (полных лет)', value: 'exp', align: 'center',  sortable: false,},
                  { text: 'Возраст (полных лет)', value: 'age', align: 'center',  sortable: false,},
                  { text: '', value: 'empty', align: 'center', sortable: false, },

              ],
              current_id:null,
              dialog:false,
              valid:true
          }
        },
        computed:{
            ...mapGetters({
                getCalculationById: "calculations/getCalculationById",
                getCalculations: "calculations/getCalculations"
            }),
            getFieldSet(){
                return (this.current_id)?this.getCalculationById(this.current_id).fields:null;
            },
            getCurrentIndex(){
                return this.getCalculations.indexOf(this.getCalculations.find(itm=>itm.id===this.current_id))
            },
            check_fields: function () {
                return this.$_.filter(this.getFieldSet, itms => {
                    if (itms.label!=='Страхователь') {
                        let result=false;
                        itms.fields.forEach(i=>{
                            result=(i.value!==null && i.value!==undefined && i.value!==false && i.value!==0)?true:result
                        });
                        return result;
                    }else{
                        return false
                    }
                }).length>0
            }

        },
        methods:{
            ...mapActions({
                createCalculation: "calculations/createCalculation"
            }),
            ...mapMutations({
                edit_ins: "calculations/edtiInsuranse",
                remove_calc: "calculations/removeCalculation",
                add_driver:"calculations/addDriver",
                delete_driver: "calculations/deleteDriver",
                driver_field: "calculations/setDireverField"
            }),
            add_driver_push(){
                this.add_driver(
                  {driver:{
                    value:false,
                    start:"Водитель "+((this.getFieldSet.drivers.table_items.length)+1),
                    age:0,
                    exp:0
                    }
                  ,index:this.getCalculations.indexOf(this.getCalculations.find(itm=>itm.id===this.current_id))}
                  )
            },
            delete_driver_call(item){
                let index = this.getCalculations.indexOf(this.getCalculations.find(itm=>itm.id===this.current_id));
                let driver_index=this.getFieldSet.drivers.table_items.indexOf(item);
                this.delete_driver({index:index,driver_index:driver_index})
            },
            calc(){
                if (this.$refs.form.validate()){
                    this.$root.$router.push("/history")
                }

            },
            insur_change(){
                this.show_tooltip= (this.ins === undefined);
                (this.current_id!==null)?this.edit_mode():this.new_mode();
            },
           async  new_mode(){
                let obj={
                    'id' :(this.getCalculations.length+1)*(-1) ,
                    'insurant' : this.ins,
                    'status' : 0,
                    'organization' : "Test_org",
                    'responsible' : "Test_user"
                };

                this.current_id=(this.getCalculations.length+1)*(-1);
                await this.createCalculation(obj);
            },
            edit_mode(){
                (this.ins!==undefined)?this.edit():this.remove_item();

            },
            edit(){
                this.edit_ins({id:this.current_id,ins:this.ins});
            },
            remove_item(){
                if (this.check_fields){
                    this.dialog=true;
                }else{
                    this.remove_remove();
                }
            },
            remove_remove(){
                this.remove_calc(this.current_id);
                this.current_id = null;
                this.ins=undefined;
            },
            save(val,index,key){
                    this.driver_field({
                        index:this.getCurrentIndex,
                        field_index:index,
                        key:key,
                        val:val
                    })
            },
            dop_proof(item){
                return  (item.type==="check")?true:this.$_.findWhere(this.getCalculationById(this.current_id).fields.ts_check.fields,{label:'Дополнительное оборудование'}).value
            }



        },
        created(){
            this.$root.$emit('change_title', 'Калькулятор')
            this.current_id=(this.id!=="new")?Number(this.id):null;
            this.show_tooltip=(this.id==="new");
            this.ins=this.getCalculationById(this.current_id).insurant;
        },


    }
</script>

<style >
    .padding_for_seconds:nth-child(odd){
        padding-right: 38px !important;
    }
    .td-center div{
        display: flex;
        justify-content: center;
    }
    .v-menu__activator{
        width:100%
    }
    .v-menu__activator>a{
        justify-content: center;
    }
    .v-small-dialog__content{
        background-color: #fff;
    }
    .fade-transition-enter,fade-transition-leave{
        opacity:0
    }
</style>