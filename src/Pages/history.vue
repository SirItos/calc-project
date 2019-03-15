<template>
    <v-container class="ma-0" style="max-width:100%!important">
        <v-layout row justify-center wrap>
            <v-flex md12>
                <v-btn outline color="info"  class="mx-0 text-uppercase mb-4" to="/"">  <v-icon left >mdi-arrow-left</v-icon> Главная</v-btn>
            </v-flex>
            <v-flex md12 sm12  style="min-height: 68px;">
                <v-card>
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
                    class="elevation-1"
                    :search="search"
                >
                    <template slot="items" slot-scope="props">
                        <tr @click="go_to_object(props.item.id)"  class="as-tr" >
                        <td class="text-md-center text-sm-center">{{ props.item.insurant }} <br>
                            {{ props.item.object }}
                        </td>
                        <td class="text-md-center text-sm-center">0</td>
                        <td class="text-md-center text-sm-center">0</td>
                        <td class="text-md-center text-sm-center">0</td>
                        <td class="text-md-center text-sm-center">0</td>
                        <td class="text-md-center text-sm-center">0</td>
                        <td class="text-md-center text-sm-center">0</td>
                        <td class="text-md-center text-sm-center">{{props.item.status_label}}</td>
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
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "history",
        data:()=>({
            headers: [
                {
                    text: 'Страхователь/Объект',
                    align: 'center',
                    value: 'insurant'
                },
                { text: 'Лимит КАСКО', value: 'klimit',     align: 'center' },
                { text: 'Премия КАСКО', value: 'kaward' ,     align: 'center'},
                { text: 'Лимит АГО', value: 'alimit',     align: 'center' },
                { text: 'Премия АГО', value: 'aaward' ,     align: 'center'},
                { text: 'Лимит НС', value: 'nslimit',     align: 'center' },
                { text: 'Премия НС', value: 'nsaward' ,     align: 'center'},
                { text: 'Статус', value: 'status_label' ,     align: 'center'},

            ],
            search:''
        }),
        computed:{
            ...mapGetters({
                get_list_progress:'calculations/getCalculations',
                get_list_server:'calculations_server/getCalculations_server'
            }) ,
            list(){
                return this.$_.union(this.get_list_progress,this.get_list_server);
            }
        },
        created(){
            this.$root.$emit('change_title', 'История взаиморасчетов')
        },
        methods:{
            go_to_object(id){
                this.$router.push({ name: 'object', params: { id: id.toString() }});

            },
            // status_class(status){
            //     return(status==="Ожидает подтверждения")?"orange-lighten-1":"";
            // },
            // set_icon_color(status){
            //     status=(status===0)?"info":(status===1)?"success":(status===2)?"warning":"error";
            //     return status;
            // },
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
</style>