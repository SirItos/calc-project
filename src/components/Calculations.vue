<template>
    <v-container  class="as-height">
        <v-layout  row wrap >
            <v-flex md6 sm6 class="pa-5">
                <v-card hover   to="/calculator/new" ripple style="height:100%">
                    <v-img
                        src="../../static/calculation-flat.jpg"
                        aspect-ratio="1.6"
                        cover

                        gradient="to bottom left, rgba(100,115,201,.2), rgba(0,0,0,.4)"
                    ></v-img>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Расчет премии КАСКО</h3>
                            <div style="text-align: justify-all; width:80%">Калькулятор для рассчита премии,  для расчета требуется: <br>
                                выбрать программу,  указать водителей и наличе ДМС, заполнить информацию о ТС и доп. оборудование.<br>
                                Текст требует дорабтки
                            </div>
                        </div>
                    </v-card-title>


                </v-card>
            </v-flex>
            <v-flex md6 sm6 class="pa-5">
                <v-card hover  to="/history" ripple>
                    <v-img
                            src="../../static/calc-flat-resume.jpg"
                            aspect-ratio="1.6"
                            cover
                            gradient="to bottom right, rgba(100,115,201,.2), rgba(0,0,0,.4)"
                    ></v-img>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Результаты расчетов премий</h3>
                            <div style="text-align: justify; width:80%">
                                Просмотр уже готовых расчетов, листов согласования,
                                а так же возможность продолжить работу над незаконченными расчетами.
                            </div>
                            <div class="mt-2 pa-1 ">
                              <v-icon >mdi-alert</v-icon><span class="subheading pl-2">Важно!</span>
                                <div class="mt-1">
                                    Все незаконченные проекты хранятся только 48 часов!<br>
                                    Постарайтесь закончить все работы в указанный срок
                                </div>
                            </div>
                        </div>
                    </v-card-title>


                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "calculations",
        created(){
            this.$root.$emit('change_title', 'Главная')
        },
    }
</script>

<style scoped>
    .as-height{
        height:calc(100vh - 100px) !important;
    }
</style>