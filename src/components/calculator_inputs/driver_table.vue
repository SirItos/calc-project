<template>
    <v-flex md6 sm6 xs12>
        <v-data-table
                class="elevation-1 mt-3"
                :headers="getHeaders"
                :items="items"
                hide-actions
        >
            <template slot="headers" slot-scope="props">
                <th
                        v-for="header in props.headers"
                        v-if="header.value"
                        :key="header.text"
                >
                    {{ header.text }}
                </th>
                <th width="100px">
                    <v-btn fab small flat @click="add_driver_push() " color="info" >
                        <v-icon  size="2em">mdi-plus</v-icon>
                    </v-btn>
                </th>
            </template>

            <template slot="items" slot-scope="props">
                <td class="text-md-center text-sm-center">{{ props.item.object }}</td>
                <td class="td-center" v-for="(item,index) in props.item" :key="index" v-if="index!=='object'">
                    <v-edit-dialog
                            :return-value.sync="props.item[index]"
                            lazy
                            @save="save(props.item[index],props.index,index)"
                    >
                        {{ (props.item[index]!=="")?props.item[index]:0 }}
                        <v-text-field
                                slot="input"
                                v-model="props.item[index]"
                                label=""
                                maxlength="2"
                                clearable
                                single-line
                        ></v-text-field>
                    </v-edit-dialog>
                </td>
                <td class="text-md-center text-sm-center">
                    <v-btn fab small flat @click="delete_driver_call(props.index)" color="info" >
                        <v-icon  >mdi-delete</v-icon>
                    </v-btn>
                </td>

            </template>


            <template slot="no-data">
                <div class="d-flex justify-center align-center row">
                    Нет водителей
                </div>
            </template>

        </v-data-table>
    </v-flex>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'
    export default {
        name: "driver_table",
        props:{
            data_set:{type:Array,default: ()=>{ return [] }},
            calculation_id:{}
        },
        data(){
          return{
              items:[]
          }
        },
        computed:{
            ...mapGetters({
                getCalculationById:'calculations/getCalculationById'
            }),
            getHeaders(){
                let result = this.data_set.map( item =>{
                    return {
                        text:item.ElementCaption,
                        value:item.ElementCaption
                    }
                })
                result.unshift({
                    text:'Наименвоание',
                    value:'object'
                })
                result.push({})
                return result
            }
        },
        methods:{
            ...mapActions({
                addDriver:'calculations/addDriverAction',
                deleteDriver:'calculations/deleteDriverAction',
                edittableObject:'calculations/editObjectAction'
            }),
            add_driver_push(){
                let obj={}
                this.getHeaders.forEach( itm => {
                    if (itm.value)
                        (itm.value==='object')?  this.$set(obj, itm.value, 'Водитель ' + this.getDriverNumber()): this.$set(obj, itm.value, 0)
                })
                this.addDriver({object:obj,id:this.calculation_id})
                this.items=this.getCalculationById(this.calculation_id).drivers
            },
            getDriverNumber(){
               return (this.getCalculationById(this.calculation_id).drivers)?
                    (this.getCalculationById(this.calculation_id).drivers.length)+1 : 1
            },
            delete_driver_call(index){
                this.deleteDriver({
                    id:this.calculation_id,
                    index:index
                })
                this.items=this.getCalculationById(this.calculation_id).drivers
            },
            save(value,index,key){
                this.edittableObject(
                    {
                        value:value,
                        index:index,
                        key:key,
                        id:this.calculation_id
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>