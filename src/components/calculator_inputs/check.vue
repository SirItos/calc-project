<template>
    <v-list class="pb-0 no_bg"  >
        <v-list-tile class="check_tile"  @click="" ripple>
            <v-list-tile-action >
                <v-checkbox v-model="status" color="primary" ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="()=>{changeValue()}" >
                <v-list-tile-title>{{data_set.ElementCaption}}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "check",
        props:{
            data_set:{type:Object,default: ()=>{ return {} }},
            calculation_id:{}
        },
        data(){
            return{
                status:Number(this.data_set.ElementValue)
            }
        },
        methods:{
            ...mapActions({
                editValue:'calculations/changeValue'
            }),
            changeValue(){
                this.status=!this.status
                this.editValue({
                    id:Number(this.calculation_id),
                    field_id:this.data_set.ElementID,
                    value:(this.status)? '1' : '0'
                })
            }
        }
    }
</script>

<style scoped>
    .no_bg{
        background-color: transparent!important;
    }
</style>