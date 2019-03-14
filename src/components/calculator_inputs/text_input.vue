<template>
    <v-text-field
            v-if="data_set.ElementType!=='money'"
            :label="data_set.ElementCaption"
            :type="data_set.ElementType"
            :rules="(!data_set.Rule)?[v => !!v || (data_set.ErrorMsg||'Ошибка')]:[]"
            clearable
            v-model="data_set.ElementValue"
            :prepend-icon="data_set.Icon"
            @input="(val)=>{this.changeValue(val)}"
    ></v-text-field>
    <v-text-field
            v-else
            v-model="initialBalanceFormatted"
            :label="data_set.ElementCaption"
            single-line
            :prepend-icon="data_set.Icon"
            :rules="(!data_set.Rule)?[v => !!v || (data_set.ErrorMsg||'Ошибка')]:[]"
            clearable
            suffix="₽"
            type="currency"
            @input="(val)=>{this.changeValue(val)}"
    ></v-text-field>
</template>

<script>
    import {mapActions} from 'vuex'
    function formatAsCurrency (value, dec) {
        dec = dec || 0
        if (value === null) {
            return 0
        }
        return '' + value.toFixed(dec).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    }
    export default {
        name: "text_input",
        props:{
            data_set:{type:Object,default: ()=>{ return {} }},
            calculation_id:{}
        },
        data(){
            return{
                initialBalance: (this.data_set.ElementValue)
            }
        },
        computed:{
            initialBalanceFormatted: {
                get: function() {
                    return formatAsCurrency(this.initialBalance, 0)
                },
                set: function(newValue) {
                    if (newValue!==null){
                        this.initialBalance = Number(newValue.replace(/[^0-9\.]/g, ''));
                    }
                }
            }
        },
        methods:{
            ...mapActions({
                editValue:'calculations/changeValue'
            }),
            changeValue(val){
                this.editValue({
                    id:Number(this.calculation_id),
                    field_id:this.data_set.ElementID,
                    value:val
                })
            }
        }
    }
</script>

<style scoped>

</style>