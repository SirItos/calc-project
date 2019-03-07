<template>
    <v-autocomplete
            :value="field_value"
            :label="comp_head"
            :loading="loading"
            :items="items"
            :item-value="(comp_items[0]+'_ID')||''"
            :item-text="(comp_items[1])||''"
            :search-input.sync="search"
            :rules="[v => !!v || ('Требуется заполнить поле')]"
            clearable
            :hide-no-data="after_search"
            open-on-clear
            :multiple="test"
            hide-selected
            @focus="get_enum_list()"
            @change="(val)=>{this.$emit('change_val_sel',val)}"
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
    import {mapGetters,mapActions} from 'vuex'
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
                after_search:true,
            }
        },
        mounted(){
            this.$nextTick(()=> {
              if (this.$props.field_value)
                  if (this.$props.field_value.length)
                         this.get_enum_list()

            })
        },
        computed:{
            ...mapGetters({
                getEnum:'storedProcedure/getEnumList',
            }),
            table_name(){
                return this.field_header.split('_')[0]
            },
            comp_head(){
                return (this.field_header.split('_')[1])||this.field_header;
            },
            comp_items(){
                return this.field_header.split('_')
            },
            test(){
                return (this.table_name!=='Filial')
            }

        },
        methods:{
            ...mapActions({
                getEnumList: "storedProcedure/getEnumListAction",
            }),
            async get_enum_list(){
                if (!this.items.length>0){
                   this.loading=true;
                    await this.getEnumList({
                        st_method:this.table_name,
                        status:0
                    })
                    this.items = this.getEnum(this.table_name)
                    this.loading=false;
                }
            }
        }
    }
</script>

<style scoped>

</style>