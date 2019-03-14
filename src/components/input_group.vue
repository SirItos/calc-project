<template>
          <select_item v-if="data_fields.type=='select'" :data="data_fields" @change_val="call_commit"></select_item>
          <text_item v-else-if="data_fields.type=='text'||data_fields.type=='money'||data_fields.type=='number'" :data="data_fields" @change_val="call_commit"></text_item>
          <check_item v-else-if="data_fields.type=='check'" :data="data_fields" @change_val="call_commit" :class_st="(item_key==='prolong')?'pt-2':'pt-0'"></check_item>
          <data_item v-else-if="data_fields.type=='data'" :data="data_fields" @change_val="call_commit"></data_item>
</template>

<script>
    import select_item from "./select_item.vue"
    import text_item from "./text_item.vue"
    import check_item from "./check-item.vue"
    import data_item from "./data-item.vue"
    import {mapMutations} from 'vuex'
    export default {
        name: "input_group",
        props:{
            data_fields:{type:Object,default:function(){return{}}},
            item_index:{type:Number,default:0},
            item_key:{type:String,default:null},
            field_index:{type:Number,default:0}
        },
        components:{
            select_item,
            text_item,
            check_item,
            data_item

        },
        methods:{
            ...mapMutations({
               mutate:'calculations/setFieldValue'
            }),
            call_commit(val){
               this.mutate({index:this.item_index,key:this.item_key,val:val,field_index:this.field_index})
            }
        }
    }
</script>

<style scoped>

</style>