<template>
    <v-container fill-height class="justify-center" >
        <div class="preloader">
            <v-fade-transition>
                <div class="data-table-preloader" v-if="loading">
                    <v-progress-circular
                            :size="100"
                            color="info"
                            indeterminate
                    ></v-progress-circular>
                </div>
            </v-fade-transition>
        </div>
        <v-layout row wrap >
            <div  class=" hid trans hidden" v-if="loading"></div>
            <v-flex>
                <v-layout row wrap align-center style="border-bottom:1px solid rgba(0,0,0,.2)">

                    <v-flex md12>
                        <v-btn outline color="info"  class="mx-0 text-uppercase mb-4" @click="back_go()">  <v-icon left >mdi-arrow-left</v-icon> Назад</v-btn>
                    </v-flex>
                    <v-flex md4 sm4 class="title">Расчет № {{id_calc}}</v-flex>
                    <v-flex md4 sm4 class="title">Стаутс: Значение</v-flex>
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
                                :value="insur"
                                :prepend-icon="'mdi-account'"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md6 sm6>
                        <v-text-field
                                label="TC"
                                type="text"
                                readonly
                                :value="TS"
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
                                <td class="text-md-center text-sm-center" v-for="(item,index) in props.item" :key="index">{{item}}</td>
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
    import {mapGetters, mapActions} from "vuex"
    export default {
        name: "history_object",
        props:{
            id:{type:String,default:'0'}
            },
        data:()=>({
            loading:false,
            current_object:{},
            headers: [
                {
                    text: 'Водители',
                    align: 'center',
                    sortable: false,
                    value: 'start'
                },
                { text: 'Стаж (полных лет)', value: 'exp', align: 'center',  sortable: false,},
                { text: 'Возраст (полных лет)', value: 'age', align: 'center',  sortable: false,},

            ],
        }),
        computed:{
            ...mapGetters({
                getCalculationById: "calculations/getCalculationById",
                getCurrent: 'calculations_server/getCurrent'
            }),
            id_calc(){
                return (this.getCurrent)?this.getCurrent[0].Calculation_ID: ''
            },
            insur(){
               if (!this.getCurrent) return
               return this.getCurrent.find(itm => {
                   return itm.ElementID === 'insured'
               }).ElementValue
            },
            TS(){
                if (!this.getCurrent) return
                let mark = this.getCurrent.find(itm => {
                    return itm.ElementID === 'marka'
                }).ElementValue
                let model = this.getCurrent.find(itm => {
                    return itm.ElementID === 'model'
                }).ElementValue
                return (mark && model) ?(mark)||'' + ' ' + (model)||'': null
            },
            dirvers() {

            },
            Organization() {
                if (!this.getCurrent) return
                return this.getCurrent.find(itm => {
                    return itm.ElementID === 'insured'
                }).ElementValue
            },
            Responsible () {

            }
        },
        methods:{
            ...mapActions({
                CurrentItemFromServer: 'calculations_server/getCurrentItem'
            }),
            async setDataFromServer(){
                if (this.id < 0) {
                    this.current_object=this.getCalculationById(Number(this.id))
                }else {
                   this.loading=true
                   await this.CurrentItemFromServer(this.id)
                   this.loading=false
                }
            },
            driver_number(item){
                return "Водитель "+(this.current_object.drivers.indexOf(item)+1)
            },
            back_go(){
                this.$root.$router.back()
            }


        },
        created(){
            let self=this;
            this.setDataFromServer()

        }
    }
</script>

<style scoped>
.preloader{
    position: absolute;
    flex:1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:1000;
}
    .hidden{
        background: rgba(255,255,255,0.6);
    }
.hid{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
}
    .trans{
        -webkit-transition: 0.3s;
        -moz-transition: 0.3s;
        -ms-transition: 0.3s;
        -o-transition: 0.3s;
        transition: 0.3s;
    }
</style>