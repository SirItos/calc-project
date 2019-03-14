<template>
    <div class="py-4  white">

        <div class="subheading px-3"> Добавить страхователя</div>
        <v-layout class="px-4" wrap row>
            <v-flex md6 class="px-2">
                <v-text-field
                    type="text"
                    label="Наименование"
                    clearable
                ></v-text-field>
            </v-flex>
            <v-flex md6 class="px-2">
                <v-text-field
                        type="text"
                        label="Поле 1"
                        clearable
                ></v-text-field>
            </v-flex>
            <v-flex md6 class="px-2">
                <v-text-field
                        type="text"
                        label="Поле 2"
                        clearable
                ></v-text-field>
            </v-flex>
            <v-flex md6 class="px-2">
                <v-text-field
                        type="text"
                        label="Поле 3"
                        clearable
                ></v-text-field>
            </v-flex>
            <v-flex class="custom-flex justify-end mt-4">
                 <v-btn color="info sm_btn"  outline>
                    <v-icon class="pr-2">mdi-undo-variant</v-icon>
                     Отменить
                 </v-btn>

                 <v-btn color="info">
                     <v-icon class="pr-2">mdi-content-save</v-icon>
                     Сохранить
                 </v-btn>

            </v-flex>
        </v-layout>

    </div>
</template>

<script>
    export default {
        name: "customer_add"
    }
</script>

<style scoped>
.custom-flex{
    display: flex;
}
</style>