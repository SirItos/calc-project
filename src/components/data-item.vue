<template>
    <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="60"
            :return-value.sync="day"

            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
    >
        <v-text-field
                slot="activator"
                :value="computedDateFormatted"
                :label="data.label"
                :prepend-icon="data.icon"
                :rules="(data.rule)?[v => !!v || (data.rule||'Ошибка')]:[]"
                readonly
                clearable
        ></v-text-field>
        <v-date-picker v-model="day" @input="()=>{$refs.menu.save(day);this.$emit('change_val',this.computedDateFormatted)}"  color="info" landscape></v-date-picker>

    </v-menu>
</template>

<script>
    export default {
        name: "data-item",
        props:{
            data:{type:Object,default:function(){return{}}}
        },
        data(){
            return{
                day: (this.data.value)||'',
                menu:false
            }
        },
        computed:{
            computedDateFormatted () {
                return this.formatDate(this.day)
            }
        },
        methods:{
            formatDate (date) {
                if (!date) return null
                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            }
        }
    }
</script>

<style scoped>

</style>