<template>
    <v-container fill-height >
        <v-layout row wrap>
            <v-flex>
                <v-layout row wrap align-center style="border-bottom:1px solid rgba(0,0,0,.2)">

                    <v-flex md4 sm4 class="title">Расчет № {{current_object.id}}</v-flex>
                    <v-flex md4 sm4 class="title">Стаутс: {{current_object.status_label}}</v-flex>
                    <v-spacer></v-spacer>
                        <v-btn fab small flat :to="'/calculator/'+current_object.id">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn fab small flat>
                            <v-icon>mdi-file-pdf</v-icon>
                        </v-btn>
                </v-layout>
                <v-layout row wrap class="mt-4">

                    <v-flex md6 sm6 class="pr-4">
                        <v-text-field
                                label="Страхователь"
                                type="text"
                                readonly
                                :value="current_object.insurant"
                                :prepend-icon="'mdi-account'"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md6 sm6>
                        <v-text-field
                                label="TC"
                                type="text"
                                readonly
                                :value="(current_object.ts)?mark_model:''"
                                :prepend-icon="'mdi-car'"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md12 sm12>
                        <v-data-table
                                class="elevation-1 mt-3"
                                :headers="headers"
                                :items="current_object.drivers"
                                hide-actions
                        >
                            <template slot="items" slot-scope="props">

                                <td class="text-md-center text-sm-center">{{driver_number(props.item)}}</td>
                                <td class="text-md-center text-sm-center">{{props.item.exp}}</td>
                                <td class="text-md-center text-sm-center">{{props.item.age}}</td>

                            </template>



                            <template slot="no-data">
                                <div class="d-flex justify-center align-center row">
                                    Нет водителей
                                </div>
                            </template>

                        </v-data-table>
                    </v-flex>

                </v-layout>
                <v-layout row wrap class="mt-4">

                    <v-flex md6 sm6 class="pr-4">
                        <v-text-field
                                label="Организация"
                                type="text"
                                readonly
                                :value="current_object.organization"
                                :prepend-icon="'mdi-office-building'"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md6 sm6>
                        <v-text-field
                                label="Ответственный"
                                type="text"
                                readonly
                                :value="current_object.responsible"
                                :prepend-icon="'mdi-account-alert'"
                        ></v-text-field>
                    </v-flex>


                </v-layout>
                <v-layout  row wrap class="mt-4 title">
                    <v-flex md12 sm12>
                        Сюда можно вывести любую интересующую информацию (например подробнее про тс, или подробнее про водителей)
                    </v-flex>

                </v-layout>
            </v-flex>
        </v-layout>


    </v-container>
</template>


<script>
    import {mapGetters} from "vuex"
    export default {
        name: "history_object",
        props:{
            id:{type:Number,default:0}
            },
        data:()=>({
            current_object:{},
            headers: [
                {
                    text: 'Водители',
                    align: 'left',
                    sortable: false,
                    value: 'start'
                },
                { text: 'Стаж (полных лет)', value: 'exp', align: 'center',  sortable: false,},
                { text: 'Возраст (полных лет)', value: 'age', align: 'center',  sortable: false,},

            ],
        }),
        computed:{
            ...mapGetters({
                getCalculationById: "calculations/getCalculationById"
            }),
            mark_model(){
                let model=(this.current_object.ts.model)||'';
                let mark=(this.current_object.ts.mark)||'';
                return model+' '+mark;
            },
        },
        methods:{
            driver_number(item){
                return "Водитель "+(this.current_object.drivers.indexOf(item)+1)
            },


        },
        created(){
            let self=this;
            this.current_object=this.getCalculationById(this.id)
        }
    }
</script>

<style scoped>

</style>