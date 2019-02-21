<template>

    <v-container  fluid >
    <v-scroll-y-reverse-transition mode="out-in">
        <v-layout wrap v-if="!enable_grid" key="buttons"  >

            <v-flex md4 sm6 class="px-2 py-2" v-for="(item,index) in dir_arr" :key="index">
                 <v-card  hover >
                     <v-card-actions class="pl-3 pl-sm-3 py-3 justify-center" @click="go_in(item.proced)">
                         <span class="title">{{item.name}}</span>
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
                </v-flex>
            </v-layout>
    </v-scroll-y-reverse-transition>
    </v-container>




</template>

<script>
    import directory_test from './directory_test'
    import InsuranceArea_table from './directory-tables/InsuranceArea_table'
    import Filialtable from './directory-tables/Filial_table'
    export default {
        components: {
            directory_test,
            InsuranceArea_table,
            Filialtable
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