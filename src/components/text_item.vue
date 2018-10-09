<template>
    <v-text-field
    v-if="data.type!=='money'"
    :label="data.label"
    :type="data.type"
    :rules="(data.rule)?[v => !!v || (data.rule||'Ошибка')]:[]"
    clearable
    v-model="data.value"
    :prepend-icon="data.icon"
    @input="()=>{this.$emit('change_val',this.data.value)}"

    ></v-text-field>
    <v-text-field
            v-else
            v-model="initialBalanceFormatted"
            :label="data.label"
            single-line
            :prepend-icon="data.icon"
            :rules="(data.rule)?[v => !!v || (data.rule||'Ошибка')]:[]"
            clearable
            suffix="₽"
            type="currency"
            @input="()=>{this.$emit('change_val',this.initialBalance)}"
    ></v-text-field>

</template>

<script>
    function formatAsCurrency (value, dec) {
        dec = dec || 0
        if (value === null) {
            return 0
        }
        return '' + value.toFixed(dec).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    }
    export default {
        name: "text_item",
        props:{
            data:{type:Object,default:function(){return{}}}
        },

        data(){
            return{

                initialBalance: (this.data.value)||null,

            }
        },
        computed: {
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
        }
    }
</script>

<style scoped>

</style>