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
                :label="field_header"
                prepend-icon="mdi-calendar"
                :rules="[v => !!v || ('Требуется заполнить поле')]"
                readonly
                clearable
        ></v-text-field>
        <v-date-picker v-model="day" @input="()=>{
                $refs.menu.save(day);
                this.$emit('change_val',computedDateFormattedToSend)
            }"
                       color="info" ></v-date-picker>

    </v-menu>
</template>

<script>
    export default {
        name: "date-input",
        props:{
            field_value:{},
            field_header:{type:String,default:'Date input'},
        },
        data(){
            return{
                day: (this.field_value)||'',
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
            formatDate (date) {
                if (!date) return null
                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            },
        }

    }
</script>

<style scoped>

</style>