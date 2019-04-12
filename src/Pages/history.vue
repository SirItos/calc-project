<template>
    <v-container class="ma-0" style="max-width:100%!important">
        <v-layout row justify-center wrap>
            <v-flex md12>
                <v-btn outline color="info"  class="mx-0 text-uppercase mb-4" to="/">  <v-icon left >mdi-arrow-left</v-icon> Главная</v-btn>
            </v-flex>
            <v-flex md12 sm12  style="min-height: 68px;">
                <v-card class="data-table-card">
                    <v-fade-transition>
                        <div class="data-table-preloader" v-if="loading">
                            <v-progress-circular
                                    :size="100"
                                    color="info"
                                    indeterminate
                            ></v-progress-circular>
                        </div>
                    </v-fade-transition>
                    <v-card-title>
                        <v-flex md6 sm6 xs6 class="relative">
                            <v-fade-transition>
                                <v-btn v-if="selected.length" color="info" flat depressed  outline @click="deleteAllConfirm()">
                                    <v-icon  small class="mr-2">mdi-delete</v-icon>
                                    Удалить
                                </v-btn>
                            </v-fade-transition>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                append-icon="search"
                                label="поиск"
                                hide-details
                                v-model="search"
                                @click:clear="()=>{this.search=null;this.searchStart()}"
                                clearable
                                @change="searchStart()"
                            >
                            </v-text-field>
                        </v-flex>
                    </v-card-title>

                <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="list"
                    :pagination.sync="pagination"
                    class="elevation-1"
                    select-all
                    item-key="Calculation_ID"
                    :rows-per-page-items="[5,10,25]"
                    :total-items="(getTotal) || 0"
                >
                    <template slot="headers" slot-scope="props">
                        <tr>
                            <th  v-if="list.length">
                                <v-checkbox

                                        :input-value="props.all"
                                        :indeterminate="props.indeterminate"
                                        primary
                                        hide-details
                                        @click.stop="toggleAll"
                                    >
                                </v-checkbox>
                            </th>
                            <th
                                    v-for="header in props.headers"
                                    v-if="needed(header.text)"
                                    :key="header.text"
                                    :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                                    @click="changeSort(header.value)"
                            >
                                <v-icon small>arrow_upward</v-icon>
                                {{ header.text }}
                            </th>
                        </tr>
                    </template>
                    <template slot="items" slot-scope="props">
                        <tr   class="as-tr"  :active="props.selected" @click="props.selected = !props.selected">
                        <td  v-if="list.length">
                            <v-checkbox
                                    :input-value="props.selected"
                                    primary
                                    hide-details
                            ></v-checkbox>
                        </td>
                        <td v-for="(item, key) in props.item" :key="key" v-if="needed(key)" class="text-xs-center" style="cursor:pointer" @click="go_to_object(props.item.Calculation_ID)">
                            {{formatItem(item,key)}}
                        </td>

                        <!--<td class="text-md-center text-sm-center" @click="go_to_object(props.item.id)">0</td>-->
                        <!--<td class="text-md-center text-sm-center" @click="go_to_object(props.item.id)">0</td>-->
                        <!--<td class="text-md-center text-sm-center" @click="go_to_object(props.item.id)">0</td>-->
                        <!--<td class="text-md-center text-sm-center" @click="go_to_object(props.item.id)">0</td>-->
                        <!--<td class="text-md-center text-sm-center" @click="go_to_object(props.item.id)">0</td>-->
                        <!--<td class="text-md-center text-sm-center" @click="go_to_object(props.item.id)">0</td>-->
                        <!--<td class="text-md-center text-sm-center" @click="go_to_object(props.item.id)">{{props.item.status_label}}</td>-->
                        </tr>
                    </template>
                    <template slot="no-data">
                        <div class="d-flex justify-center align-center row">
                            Нет рассчетов
                        </div>
                    </template>
                    <template slot="no-results">
                        <div class="d-flex justify-center align-center row">
                            Поиск по запросу "{{search}}" ничего не дал.
                        </div>
                    </template>
                </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog
                v-model="dialog.mode"
                max-width="400"
                persistent
        >
            <v-card>
                <v-card-title class="headline">
                    Предупреждение!
                </v-card-title>
                <v-card-text>
                    {{dialog.text}}
                </v-card-text>
                <v-card-actions v-if="dialog.error">
                    <v-spacer></v-spacer>
                    <v-btn
                            color="grey darken-1"
                            flat
                            @click="()=>{this.dialog.mode=false;}"
                    >
                        Нет
                    </v-btn>
                    <v-btn
                            color="info"
                            flat
                            @click="()=>{this.dialog.mode=false; this.deleteAll()}"
                    >
                        Да
                    </v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="info"
                            flat
                            @click="()=>{this.dialog.mode=false;}"
                    >
                        Ок
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-container>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'
    export default {
        name: "history",
        data:()=>({
            headers:[],
            search:'',
            selected:[],
            pagination:{
                rowsPerPage:10
            },
            loading:false,
            dialog:{
                text:'',
                mode:false,
                error:true
            }
        }),
        computed:{
            ...mapGetters({
                get_list_progress:'calculations/getCalculations',
                get_list_server:'calculations_server/getCalculations_server',
                get_total_server:'calculations_server/getTotal_server',
                userData:'user/getUserData'
            }) ,
            list(){
                return (this.pagination.page < 2) ?this.$_.union(this.get_list_progress,this.get_list_server) : this.get_list_server;
            },
            getTotal() {
                return this.get_list_progress.length + this.get_total_server
            }
        },
        created(){
            this.$root.$emit('change_title', 'История расчетов')
        },
        watch: {
            pagination:{
                handler:function (){
                    this.setDataFromServer()
                },
                deep:true
            }
        },
        methods:{
            ...mapActions({
                ServerCalculations: 'calculations_server/getServerCalculations',
                removeCalculations :'calculations/clearCalculation'
            }),
            //Запрос данных с сервера
            async setDataFromServer(){
                this.loading=true
                await this.ServerCalculations({
                    pagination:this.pagination,
                    search:this.search
                })
                this.headers=this.headers_set()
                this.loading = false
            },


            headers_set(){
                let self = this;
                let set=[]
                if (this.get_list_server.length) {
                    Object.keys(this.get_list_server[0]).forEach(item => {
                        if (self.needed(item)) {
                            set.push({text: item, value: item, align: 'center',sortable:true})
                        }
                    })
                    // set.push({text: '', value: '', align: 'center',sortable: false})
                }
                return set
            },


            go_to_object(id){
                this.$router.push({ name: 'object', params: { id: id.toString() }});

            },
            toggleAll(){
                if (this.selected.length) {
                    this.selected = []
                }
                else {
                    this.selected=this.list.slice()

                }
            },
            needed(key){
                return (key.indexOf('ID') < 0 && key.indexOf('Record') < 0 && key.indexOf('id') )
            },
            formatItem (item, key) {
                return (key.indexOf('Дата') < 0) ? item : this.$moment(item,'YYYY-MM-DD').format('DD.MM.YYYY')
            },

            async searchStart(){
                await this.setDataFromServer();

            },




            changeSort (column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }
            },
            deleteAllConfirm(){
                this.dialog.mode=true;
                this.dialog.text='Удалить '+this.selected.length + '  элемент(ов)?'
                this.dialog.error=true
            },
            deleteAll(){
               if (this.check_before_delete()){
                    this.selected.forEach( itm => {

                        this.removeCalculations(itm.id)
                    })
               }else{
                   this.dialog.mode=true;
                   this.dialog.text='Ошибка! Нельзя удалить элементы созданые другим пользователем!'
                   this.dialog.error=false
               }
            },
            check_before_delete(){
              return this.selected.find( itm => {
                  return itm.responsible === this.userData.id
              })
            },
            back_go(){
                this.$root.$router.back()
            },
        }
    }
</script>

<style scoped>
    .as-tr{
        cursor:pointer;
    }
    .as-header{
        display:none!important;
    }
    .as-th{
        max-width: 160px;
        margin:0 auto;
    }

    .as-separator{
        position: relative;
    }

   .as-separator:after{
       content:"/";
       position: absolute;
       right: 0;
       bottom: 20%;
       height:80%;
       width:1px;
   }
    .as-flex{
        display: flex;
        height:100%
    }

    .data-table-card{
        position: relative;
    }
    .data-table-preloader{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: rgba(250, 250, 250, 0.6);
        z-index:1000;

    }
    .data_table_btn{
        margin:6px 2px;
    }

</style>