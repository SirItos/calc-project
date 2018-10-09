<template>
    <v-autocomplete
        :value="data.value"
        :items="data.values"
        clearable
        :rules="(data.rule)?[v => !!v || (data.rule||'Ошибка')]:[]"
        open-on-clear
        autocomplete
        :label="data.label"
        :prepend-icon="data.icon"
        search-input
        @change="(val)=>{this.$emit('change_val',val)}"
    >
        <template slot="no-data">
            <v-list-tile>
                <v-list-tile-title>
                  Поиск не принес результатов Т_Т
                </v-list-tile-title>
            </v-list-tile>
        </template>
    </v-autocomplete>
</template>

<script>
    export default {
        name: "select_item",
        props:{
            data:{type:Object,default:function(){return{}}}
        },

    }
</script>

<style scoped>

</style>