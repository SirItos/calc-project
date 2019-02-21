<template>
    <v-autocomplete
            :value="field_value"
            :label="comp_head"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            clearable
            :hide-no-data="after_search"
            open-on-clear
            hide-selected
            @focus="get_enum_list()"



    >
        <template slot="no-data">
            <v-list-tile>
                <v-list-tile-title>
    Поиск не принес результатов Т_Т

                </v-list-tile-title>
            </v-list-tile>
        </template>
    </v-autocomplete>
</template>

<script>
    export default {
        name: "select-input",
        props:{
            field_value:{},
            field_header:{type:String,default:'Select input'},
        },
        data(){
            return{
                search:null,
                loading:false,
                items:[],
                after_search:true
            }
        },
        computed:{
            comp_head(){
                return (this.field_header.split('_')[1])||this.field_header;
            }
        },
        methods:{
            get_enum_list(){
                console.log('Loading Items from server');
                this.loading=true
            }
        }
    }
</script>

<style scoped>

</style>