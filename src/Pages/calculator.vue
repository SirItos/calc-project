<template>

    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container fill-height fluid>
            <v-layout row wrap fill-width class="mx-4">
                <v-flex md12>
                    <v-btn outline color="info"  class="mx-0 text-uppercase mb-4" @click="back_go()">  <v-icon left >mdi-arrow-left</v-icon> Главная</v-btn>
                </v-flex>

                <!--Страхователь-->
                <v-flex md5 sm6 xs6 class="custom-flex align-center" >

                    <v-autocomplete
                        slot="activator"
                        autocomplete
                        v-model="ins"
                        :items="[
                            {
                                value:1,
                                label:'Test_1'
                            }
                        ]"
                        item-text="label"
                        item-value="value"
                        :label="getInsurInputData.ElementCaption"
                        :prepend-icon="getInsurInputData.Icon"
                        search-input
                        :rules="(getInsurInputData.ErrorMsg)?[v => !!v || getInsurInputData.ErrorMsg]:[]"
                        @input="val=>{ this.changeInsurData(val)}"
                    >
                        <template slot="no-data">
                            <v-list-tile>
                                <v-list-tile-title>
                                    Поиск не принес результатов Т_Т
                                </v-list-tile-title>
                            </v-list-tile>
                        </template>
                    </v-autocomplete>
                    <v-tooltip right>
                        <v-btn
                                class="mx-3"
                                slot="activator"
                                icon
                                flat
                                ripple
                                label="button"
                                @click="confirmDeleeting()"
                        >
                            <v-icon size="2em" >mdi-close</v-icon>
                        </v-btn>
                        <span>Очистить форму</span>
                    </v-tooltip>
                </v-flex>
                <v-spacer></v-spacer>
                 <div class="custom-flex align-center acord-icon-btn" :class="(acord)?'acord-icon-btn_active':'' ">
                     <v-tooltip left>
                            <v-btn
                                    class="mx-3"
                                    slot="activator"
                                    icon
                                    flat
                                    ripple
                                    label="button"
                                    @click="acord=!acord"
                            >
                                <v-icon size="2em" >mdi-plus</v-icon>
                            </v-btn>
                         <span>Добавить страхователя</span>
                     </v-tooltip>
                 </div>

                <!--Сегмент с раскрывающейся формой (пока не сделал, только план)-->
                <v-flex md12 >
                <v-expand-transition>
                   <div  v-if="acord">
                       <customer_add></customer_add>
                   </div>
                </v-expand-transition>
                </v-flex>

                <!--Построитель формы на основание JSON-->
                <v-fade-transition tag="v-flex" class="md12 sm12 xs12" group>
                    <!--<v-flex class="py-2 " md12 sm12 xs12  >-->
                            <calc_input_groups :field_set="item" :calculation_id="fields.id" v-if="fields.fields" v-for="(item,index) in jsonFields" :key="index"></calc_input_groups>
                    <v-flex md12 sm12 justify-center class="py-5" key='btn_calc'  v-if="fields.fields" >
                        <v-btn
                                large
                                block
                                color="primary"
                                @click="calc()"
                        >Сохранить</v-btn>
                    </v-flex>
                    <!--</v-flex>-->
                </v-fade-transition>





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
                                    @click="()=>{this.dialog=false; this.deleteCalculation()}"
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
    import calc_input_groups from '../components/calcs_input_groups'
    import customer_add from "../components/customer_add"
    import {mapGetters,mapActions,mapMutations} from "vuex"
    export default {
        name: "calculator",
        components:{
            customer_add,
            calc_input_groups
        },
        data(){
          return{
              ins:undefined,
              show_tooltip:true,
              acord:false,
              valid:false,
              fields:[],
              dialog:false
          }
        },
        computed:{
            ...mapGetters({
                getCalculationById: "calculations/getCalculationById",
                getCalculations: "calculations/getCalculations",
                getFields:'calculations/getFields',
                userData:'user/getUserData'
            }),
            getInsurInputData(){
                return  (this.$_.findWhere((this.fields.fields)?this.fields.fields:this.fields, item => {
                    return item.ElementID === 'insured'
                })) || ''
            },
            jsonFields(){
                return this.$_.filter(this.$_.sortBy(this.$_.groupBy(this.fields.fields,'GroupID'), gr => {
                    return Number(gr[0].GroupOrder)
                }), (item,index) => {
                    return index!==0
                })
            }

        },
        methods:{
            ...mapActions({
                getFormFields: 'calculations/getFormFields',
                createCalculationStore:'calculations/createCalculation',
                clearCalculation:'calculations/clearCalculation'
            }),
            async getFieldsScheme(){
                if (!this.getFields.length) {
                    await this.getFormFields()
                }
                this.fields = this.getFields
            },
            changeInsurData(val){
                (val)?this.createCalculation(val):  this.confirmDeleeting()
            },
            async createCalculation(val){
                this.ins=val
                this.$_.findWhere(this.fields,{ElementID:'insured'}).ElementValue=val
                let temp_id=this.createTempId()
                await this.createCalculationStore({
                    id:temp_id,
                    insurant:val,
                    organization:'test',
                    responsible:this.userData.id,
                    fields:this.fields
                })
               this.fields=this.getCalculationById(temp_id)
            },

            createTempId(){
                return Number(this.getCalculations.length)*(-1)-1
            },
            deleteCalculation(){
                this.ins= undefined
                this.clearCalculation(this.fields.id)
                this.fields = this.getFields
                console.log('deleting')
            },
            confirmDeleeting(){
                this.dialog=true
            },
            back_go(){
                this.$root.$router.back()
            },
            calc(){
                console.log('Отправляем данные на сервер')
            }

        },
        created(){
            this.$root.$emit('change_title', 'Калькулятор')
            this.getFieldsScheme()


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
    .v-small-dialog__content {
        background-color: #fff;
    }
    .custom-flex{
        display: flex;
    }
.acord-icon-btn{
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -ms-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
}
    .acord-icon-btn_active{
        transform: translateY(100%) rotate(315deg);
    }

</style>