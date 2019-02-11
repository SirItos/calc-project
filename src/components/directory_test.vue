<template>
    <v-container fill-height fluid>
        <v-layout wrap>
            <v-flex md12>
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
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-text-field
                                append-icon="search"
                                label="поиск"
                                hide-details
                                v-model="search"
                                clearable
                        >

                        </v-text-field>
                    </v-card-title>
                    <v-data-table
                            :headers="headers"
                            :items="list"
                            :pagination.sync="pagination"
                            class="elevation-1"
                            :search="search"
                    >
                        <template slot="headers" slot-scope="props">
                            <tr>
                                <th
                                    v-for="header in props.headers"
                                    :key="header.text"
                                    v-if="(header.sortable)"
                                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                                @click="changeSort(header.value)"
                                ><v-icon small>arrow_upward</v-icon>
                                {{header.text}}</th>
                                <th  width="100px"  >
                                    <v-btn fab small  flat ripple color="info"  class="data_table_btn" >
                                        <v-icon  size="2em" v-if="!loading">mdi-plus</v-icon>
                                    </v-btn>
                                </th>
                            </tr>
                        </template>
                            <template slot="items" slot-scope="props">
                               <tr>
                                   <td v-for="(cell,index) in props.item" :key="index" v-if="check(index)" class="text-md-center text-sm-center">{{(setType(props.item,index))?cell:convertToData(cell)}}</td>
                                   <td class="text-md-center text-sm-center px-1" width="100px">
                                       <v-btn fab small  flat ripple color="info" class="data_table_btn" >
                                           <v-icon  >mdi-pencil</v-icon>
                                       </v-btn>
                                       <v-btn fab small  flat ripple color="info"  class="data_table_btn"  @click="deleteItem(props.item)">
                                           <v-icon  >mdi-delete</v-icon>
                                       </v-btn>
                                   </td>
                               </tr>
                            </template>
                        <template slot="no-data">
                            <div class="d-flex justify-center align-center row py-5">
                                <v-scroll-y-transition mode="out-in">
                                    <div class="title text-md-center text-sm-center">Нет информации</div>
                                </v-scroll-y-transition>
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
    </v-container>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name: "directory_test",
        data:()=>({
                array_data:[],
                headers:[],
                list:[],
                search:'',
                pagination:{},
                loading:true
        }),
        computed:{
            ...mapGetters({
                getDickData:'storedProcedure/getStoreList'
            }),
        },
        created(){
           this.$root.$emit('change_title', 'Тестовый справочник')

        },
        mounted(){
          this.$nextTick(async function(){
               this.setDataFromServer()

          })
        },
        methods: {
            ...mapActions({
                getList: "storedProcedure/getList",
                deleteItemAction: "storedProcedure/deleteItemAction"

            }),
            async setDataFromServer() {
                await this.getList('insurPeriod')
                this.list = (this.getDickData('insurPeriod'))
                await this.setHeaders()
                this.loading = false;

            },
            async setHeaders() {
                let self = this;
                if (this.list.length > 0) {
                    Object.keys(this.list[0]).forEach(item => {
                        if (self.check(item)) {
                            this.headers.push({text: item, value: item, align: 'center',sortable:true})
                        }
                    })
                    this.pagination = Object.assign({},this.pagination,{
                        sortBy:this.headers[0],
                        rowsPerPage:10
                    })
                     // this.pagination.sortBy=this.headers[0]
                     this.headers.push({text: '', value: this.headers[0], align: 'center',sortable: false})
                }
            },
            async deleteItem(item){
                let payload={
                    name:'insurPeriod',
                    id:item.InsurancePeriodID,
                    RecordTimestamp:item.RecordTimestamp,

                }
                await this.deleteItemAction(payload);

            },






            //Вспомогательные
            check(item) {
                return (item.indexOf('ID') < 0 && item.indexOf('Record') < 0 && item.indexOf('status') < 0 && item.indexOf('type')<0)
            },
            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }

            },
            setType(item,index){
                return (item.type[index] !== 'datetime')
            },
            convertToData(strDate){
              return this.$moment(strDate).format('DD.MM.YYYY');
            }
        }
    }
</script>

<style scoped >
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
        background: rgba(250, 250, 250, 0.9);
        z-index:1000;

    }
    .data_table_btn{
        margin:6px 2px;
    }


</style>