<template>

    <v-text-field
            :label="field_header"
            type="text"
            clearable
            v-model="val"
            :rules="[v => !!v || ('Требуется заполнить поле')]"
            @input="()=>{this.$emit('change_val',val)}"
    ></v-text-field>

</template>

<script>
    export default {
        name: "text_input",
        props:{
            field_value:{},
            field_header:{type:String,default:'Text input'},
        },
        data(){
            return{
                val:this.field_value
            }
        }
    }
</script>

<style scoped>

</style>