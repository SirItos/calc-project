<template>

              <v-card ref="card_modal" class="card_trs">
                      <v-card-title class="headline">{{(mode)?'Добаввление':'Редактирование'}}
                      </v-card-title>
                      <v-card-text>
                          <v-form ref="fmodal" v-model="valid" lazy-validation>
                          <v-container grid-list-md>
                              <v-layout wrap>
                                  <field_create v-for="(field,index) in field_set" :data_value="field_set" :key="index" :data_type="field_set.type[index]" :data_header="index" v-if="check(index)" @wasedit="was_edit=true"></field_create>
                              </v-layout>
                          </v-container>
                          </v-form>
                      </v-card-text>
                  <v-card-actions style="flex-wrap:wrap">
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="close_modal()"  :disabled="show_confirm_cmp">Закрыть</v-btn>
                      <v-btn color="blue darken-1" flat  @click="save_modal()"  :disabled="show_confirm_cmp">Сохранить</v-btn>
                      <transition name="fade" mode="out-in">
                          <div v-if="show_confirm_cmp" style="width:100%; flex-wrap:wrap" class="d-flex justify-end mt-2 " >
                              <div class="headline mr-5 text-md-right blue--text" style="width:100% ">Вы уверены?</div>

                                <v-btn color="blue darken-1" flat @click="show_confirm_gr=false" class="shur_btn">Нет</v-btn>
                                <v-btn color="blue darken-1" flat  @click="close_modal_window()" class="shur_btn">Да</v-btn>

                          </div>
                      </transition>
                  </v-card-actions>
              </v-card>



</template>

<script>
    import field_create from './directory_form_creater'
    export default {
        name: "add_edit_dialog",
        props:{
            mode:{type:Boolean,default:false},
            field_set:{type:Object,default:()=>{return {}}}
        },
        data(){
            return{
                was_edit:false,
                show_confirm_gr:false,
                valid:true
            }
        },
        components:{
            field_create
        },
        computed:{
            show_confirm_cmp(){
                return this.was_edit && this.show_confirm_gr
            }
        },
        methods:{
            check(item) {
                return (item.indexOf('ID') < 0 && item.indexOf('Record') < 0 && item.indexOf('status') < 0 && item.indexOf('type')<0)
            },
            close_modal(){
                if (this.was_edit){
                    this.show_confirm_gr=true
                }else{
                    this.$emit('dialog_close',true)
                }
            },
            close_modal_window(){
               this.show_confirm_gr=false
               this.was_edit=false
               this.$emit('dialog_close',false)
            },
            save_modal(){

            }



        }



    }
</script>


<style >

    .shur_btn{
        flex:0 0 auto!important
    }
    .fade-enter-active, .fade-leave-active {
        transition: .2s;
    }
    .fade-enter, .fade-leave-to  {
        transform:translateY(-10px);
        opacity: 0;
    }

</style>