<template>
   <v-list class="pb-0 no_bg" :class="class_st" >
        <v-list-tile class="check_tile"  @click="" ripple>
            <v-list-tile-action >
                <v-checkbox v-model="status" color="primary" @change="()=>this.$emit('change_val',status)"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="()=>{this.status=!this.status; this.$emit('change_val',this.status)}" >
                <v-list-tile-title>{{data.label}}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
   </v-list>
</template>

<script>
    export default {
        name: "check-item",
        props:{
            data:{type:Object,default:function(){return{}}},
            class_st:{type:String,default:'pt-0'}
        },
        data(){
            return{
                status:this.data.value
            }
        }
    }
</script>

<style scoped>

    .no_bg{
        background-color: transparent!important;
    }
</style>