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
                :label="data_set.ElementCaption"
                :prepend-icon="data_set.Icon"
                :rules="(!data_set.Rule)?[v => !!v || (data_set.ErrorMsg||'Ошибка')]:[]"
                readonly
                @input="(val)=>{(!val)?this.changeValue(val):''}"
                clearable
        ></v-text-field>
        <v-date-picker v-model="day" @input="()=>{
                $refs.menu.save(day);
                this.changeValue(computedDateFormattedToSend)
            }"
                       color="info" ></v-date-picker>

    </v-menu>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "date",
        props:{
            data_set:{type:Object,default: ()=>{ return {} }},
            calculation_id:{}

        },
        data(){
            return{
                day: (this.data_set.ElementValue)||'',
                menu:false
            }
        },
        computed: {
            computedDateFormatted() {
                if (!this.day) return null
                return this.$moment(this.day).format('DD.MM.YYYY')
            },
            computedDateFormattedToSend(){
                if (!this.day) return null
                return this.$moment(this.day).format('YYYY-MM-DD')
            }
        },
        methods:{
            ...mapActions({
                editValue:'calculations/changeValue'
            }),
            formatDate (date) {
                if (!date) return null
                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            },
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