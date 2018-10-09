<template>

        <v-container fluid>

        <v-layout row justify-center>
            Коэффиценты
        </v-layout>

    </v-container>
</template>

<script>
    export default {
        name: "counter",
        created(){
            this.$root.$emit('change_title', 'Коэффиценты')
        }
    }
</script>

<style scoped>

</style>