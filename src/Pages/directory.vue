<template>

    <v-container  fluid >
    <v-scroll-y-reverse-transition mode="out-in">
        <v-layout wrap v-if="!enable_grid" key="buttons"  >

            <v-flex md4 sm6 class="px-4 py-3 " v-for="(item,index) in dir_arr" :key="index">
                 <v-card  hover  class="fill-height">
                     <v-card-actions class="pl-3 pl-sm-3 py-3 justify-center fill-height" @click="go_in(item.proced)">
                         <span class="title  text-md-center">{{item.name}}</span>
                         <!--<v-spacer></v-spacer>-->
                         <!--<v-btn icon @click.prevent="()=>{isFav=!isFav}" flat  ripple color="info">-->
                             <!--<v-icon  >-->
                                <!--{{(isFav)?" mdi-star":" mdi-star-outline"}}-->
                             <!--</v-icon>-->
                         <!--</v-btn>-->
                     </v-card-actions>
                 </v-card>
            </v-flex>
        </v-layout>

            <v-layout wrap v-if="enable_grid" key="grids" >



                <v-flex md12 >
                    <v-btn outline color="info"  class="mx-4 text-uppercase" @click="go_back()">  <v-icon left >mdi-arrow-left</v-icon> назад</v-btn>
                   <directory_test  v-if="procedure_name==='InsurancePeriod'" :procedure="procedure_name"></directory_test>
                    <InsuranceArea_table v-else-if="procedure_name==='InsuranceArea'" :procedure="procedure_name"></InsuranceArea_table>
                    <Filialtable v-else-if="procedure_name==='Filial'" :procedure="procedure_name"></Filialtable>
                    <BonusMalus_table v-else-if="procedure_name==='BonusMalus'" :procedure="procedure_name"></BonusMalus_table>
                    <carjackingrisklevel v-else-if="procedure_name==='CarJackingRiskLevel'" :procedure="procedure_name"></carjackingrisklevel>
                    <FilialArea v-else-if="procedure_name==='FilialInsuranceArea'" :procedure="procedure_name"></FilialArea>
                    <TSUsagePeriod v-else-if="procedure_name==='TSUsagePeriod'" :procedure="procedure_name"></TSUsagePeriod>
                    <InsurancePayoutCount v-else-if="procedure_name==='InsurancePayoutCount'" :procedure="procedure_name"></InsurancePayoutCount>
                    <InsuranceProduct v-else-if="procedure_name==='InsuranceProduct_something'" :procedure="'InsuranceProduct'"></InsuranceProduct>
                </v-flex>
            </v-layout>
    </v-scroll-y-reverse-transition>
    </v-container>




</template>

<script>
    import directory_test from '../components/directory-tables/directory_test'
    import InsuranceArea_table from '../components/directory-tables/InsuranceArea_table'
    import Filialtable from '../components/directory-tables/Filial_table'
    import BonusMalus_table from '../components/directory-tables/BonusMalus_table'
    import carjackingrisklevel from '../components/directory-tables/CarJackingRiskLevel_table'
    import FilialArea from '../components/directory-tables/FilialArea'
    import TSUsagePeriod from '../components/directory-tables/TSUsagePeriod'
    import InsurancePayoutCount from '../components/directory-tables/InsurancePayoutCount'
    import InsuranceProduct from '../components/directory-tables/InsuranceProduct'
    export default {
        components: {
            directory_test,
            InsuranceArea_table,
            Filialtable,
            BonusMalus_table,
            carjackingrisklevel,
            FilialArea,
            TSUsagePeriod,
            InsurancePayoutCount,
            InsuranceProduct
        },
        name: "directory",
        data(){
            return{
                isFav:false,
                enable_grid:false,
                procedure_name:'',
                dir_arr:[
                    {
                        name:`Периоды страхования`,
                        proced:`InsurancePeriod`
                    },
                    {
                        name:`Территория страхования`,
                        proced:`InsuranceArea`
                    },
                    {
                        name:`Филиалы`,
                        proced:`Filial`
                    },
                    {
                        name:`Бонус-Малус`,
                        proced:`BonusMalus`
                    },
                    {
                        name:`Уровень риска`,
                        proced:`CarJackingRiskLevel`
                    },
                    {
                        name:`Территории страхования филиала`,
                        proced:`FilialInsuranceArea`
                    },
                    {
                        name:'Период использования ТС',
                        proced:'TSUsagePeriod'
                    },
                    {
                        name:'Кол-во выплат',
                        proced:'InsurancePayoutCount'
                    },
                    {
                        name:'Страховой продукт',
                        proced:'InsuranceProduct_something'
                    }
                ]
            }
        },
        methods:{
            go_in(prname){
                this.procedure_name=prname
                this.enable_grid=!this.enable_grid
            },
            go_back(){
                this.enable_grid=false;
                this.$root.$emit('change_title', 'Справочники');
            }
        },
        created(){
            this.$root.$emit('change_title', 'Справочники')
        }
    }
</script>

<style scoped>


</style>