<template>
    <v-container>
        <v-layout row justify-center>
            Транспортное средство
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "ts",
        created(){
            this.$root.$emit('change_title', 'Транспортные средства')
        }
    }
</script>

<style scoped>

</style>