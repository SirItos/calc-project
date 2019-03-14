<template>
    <v-layout wrap row class="pt-2 pb-5" >
        <v-flex md12 sm12 xs12 class="subheading">{{field_set[0].GroupName}}</v-flex>
        <v-flex md6 sm6 xs12 v-for="(item,index) in sortFields" :key="index" :class="paddingClass(index)" v-if="item.ElementType!=='table\\column' && item.ElementType!=='table'">
            <text_input v-if="item.ElementType==='text'||item.ElementType==='money'||item.ElementType==='number'"
                :data_set="item"
                :calculation_id="calculation_id"
            ></text_input>
            <date_input v-else-if="item.ElementType==='date'" :data_set="item" :calculation_id="calculation_id"></date_input>
            <select_input v-else-if="item.ElementType==='select'" :data_set="item" :calculation_id="calculation_id"></select_input>
            <check_input v-else-if="item.ElementType==='check'" :data_set="item" :calculation_id="calculation_id"></check_input>
        </v-flex>
        <driver_table v-if="check_table.length" :data_set="check_table" :calculation_id="calculation_id"></driver_table>
    </v-layout>
</template>

<script>
    import text_input from './calculator_inputs/text_input'
    import date_input from '../components/calculator_inputs/date'
    import select_input from './calculator_inputs/select_input'
    import check_input from '../components/calculator_inputs/check'
    import driver_table from '../components/calculator_inputs/driver_table'
    export default {
        name: "calcs_input_groups",
        props:{
            field_set:{type:Array,default:()=>{return []}},
            calculation_id:{}
        },
        components:{
          text_input,
          date_input,
          select_input,
          check_input,
          driver_table
        },
        computed:{
            sortFields(){
                return this.$_.sortBy(this.field_set, item =>{
                    return Number(item.ElementOrder)
                })
            },
            check_table(){
                return this.$_.filter(this.field_set, itm => {
                    return itm.ElementType === 'table\\column'
                })

            }

        },
        methods:{
            paddingClass(index){
                return (index % 2>0)?'pl-4':'pr-4'
            }
        }

    }
</script>

<style scoped>

</style>