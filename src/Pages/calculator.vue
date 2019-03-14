<template>

    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container fill-height fluid>
            <v-layout row wrap fill-width class="mx-4">
                <v-flex md12>
                    <v-btn outline color="info"  class="mx-0 text-uppercase mb-4" to="/">  <v-icon left >mdi-arrow-left</v-icon> Главная</v-btn>
                </v-flex>

                <!--Страхователь-->
                <v-flex md6 sm6 xs6 class="custom-flex align-center" >

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
                        clearable
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
                </v-flex>
                <v-spacer></v-spacer>
                 <div class="custom-flex align-center acord-icon-btn" :class="(acord)?'acord-icon-btn_active':'' ">
                     <v-tooltip left>
                            <v-btn
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
                    <!--</v-flex>-->
                </v-fade-transition>




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
              fields:[]
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
                (val)?this.createCalculation(val):this.deleteCalculation()
            },
            async createCalculation(val){
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
                this.clearCalculation(this.fields.id)
                this.fields = this.getFields
                console.log('deleting')
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