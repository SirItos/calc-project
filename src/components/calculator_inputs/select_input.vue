<template>
    <v-autocomplete
            :value="data_set.ElementValue"
            :items="items"
            :item-value="(computedValues[0])||''"
            :item-text="(computedValues[1])||''"
            clearable
            :rules="(Number(data_set.Mandatory))?(!data_set.Rule)?[v => !!v || (data_set.ErrorMsg||'Ошибка')]:[]:[]"
            open-on-clear
            autocomplete
            :label="data_set.ElementCaption"
            :prepend-icon="data_set.Icon"
            search-input
            hide-selected
            :hide-no-data="after_search"
            :loading="loading"
            @focus="getList()"
            @change="(val)=>{changeValue(val)}"
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
<!--  @change="(val)=>{this.$emit('change_val',val)}"-->
<script>
    import {mapActions,mapGetters} from 'vuex'
    export default {
        name: "select_input",
        props:{
            data_set:{type:Object,default: ()=>{ return {} }},
            calculation_id:{}
        },
        data(){
            return{
                items:[],
                loading:false,
            }
        },
        computed:{
            ...mapGetters({
                getEnum:'storedProcedure/getEnumList',
            }),
            computedValues(){
               let result=''
                if (this.items.length){
                    result = Object.keys(this.items[0])
                }
                return result
            },
            after_search(){
                return (this.items.length===0)
            }
        },
        methods:{
            ...mapActions({
                getEnumList: "storedProcedure/getEnumListAction",
                editValue:'calculations/changeValue'
            }),
            async getList(){
               if(this.data_set.SourceName){
                   if (!this.getEnum(this.data_set.SourceName.replace('p_','').replace('GetEnum',''))) {
                       this.loading=true
                       await this.getEnumList({
                           st_method: this.data_set.SourceName.replace('p_', '').replace('GetEnum', ''),
                           status: 0
                       })
                       this.loading=false
                   }
                   this.items=(this.getEnum(this.data_set.SourceName.replace('p_','').replace('GetEnum','')))||[]
               }
            },
            changeValue(val){
                this.editValue({
                    id:Number(this.calculation_id),
                    field_id:this.data_set.ElementID,
                    value:val
                })
            }
        }
    }
</script>

<style scoped>

</style>