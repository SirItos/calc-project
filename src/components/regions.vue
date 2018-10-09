<template>
    <v-container fluid>
        <v-layout row justify-center>
            Регионы
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "regions",
        created(){
            this.$root.$emit('change_title', 'Справочник регионов')
        }
    }
</script>

<style scoped>

</style>