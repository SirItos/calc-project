<template>
    <v-flex :class="comp_class">
            <text_input v-if="data_type==='nvarchar'" :field_header="data_header" :field_value="data_value[data_header]" @change_val="newVal" ></text_input>
            <date_input v-if="data_type==='datetime'" :field_header="data_header" :field_value="data_value[data_header]" @change_val="newVal"></date_input>
    </v-flex>
</template>

<script>
    import text_input from './text_input'
    import date_input from './date_input'
    export default {
        name: "directory_form_creater",
        props:{
            data_type:{type:String,default:'text'},
            data_value:{},
            data_header:{type:String,default:''}
        },
        components:{
            text_input,
            date_input
        },
        computed:{
            comp_class(){
                return  (Object.keys(this.data_value).length>7)?'xs12 sm12 md6':'md12 sm12 xs12'
            }
        },
        methods:{
            newVal(val){
                this.$set(this.data_value,this.data_header,val)
                this.$emit('wasedit')
            }
        }
    }
</script>

<style scoped>

</style>