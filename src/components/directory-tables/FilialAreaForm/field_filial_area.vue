<template>
    <v-flex :class="comp_class">
        <text_input v-if="data_type==='nvarchar'" :field_header="data_header" :field_value="data_value[data_header]" @change_val="newVal" ></text_input>
        <date_input v-if="data_type==='datetime'" :field_header="data_header" :field_value="data_value[data_header]" @change_val="newVal"></date_input>
        <select_input v-if="data_type==='select'" :field_header="data_header" :field_value="data_value[data_header.split('_')[0]+'_ID']" @change_val_sel="newVal_select" ></select_input>
    </v-flex>
</template>

<script>
    import text_input from './text-input'
    import date_input from './date-input'
    import select_input from './select-input'
    export default {
        name: "filial_form",
        props:{
            data_type:{type:String,default:'text'},
            data_value:{},
            data_header:{type:String,default:''},
        },
        components:{
            text_input,
            date_input,
            select_input
        },
        computed:{
            comp_class(){
                return  (Object.keys(this.data_value).length>5)?'xs12 sm12 md6':'md12 sm12 xs12'
            }
        },
        methods:{
            newVal(val){
                this.$set(this.data_value,this.data_header,val)
                this.$emit('wasedit')
            },
            newVal_select(val){
                this.$set(this.data_value,this.data_header.split('_')[0]+'_ID',(val)||'')
                this.$emit('wasedit')
            }
        }
    }
</script>

<style scoped>

</style>