<template>

    <v-container fill-height fluid >
    <v-scroll-y-reverse-transition mode="out-in">
        <v-layout wrap v-if="!test_val" key="buttons"  >
            <v-flex md3 sm6>
                 <v-card  hover >
                     <v-card-actions class="pl-3 pl-sm-3 py-3 justify-center" @click="test()">
                         <span class="title">Периоды страхования</span>
                         <!--<v-spacer></v-spacer>-->
                         <!--<v-btn icon @click.prevent="()=>{isFav=!isFav}" flat  ripple color="info">-->
                             <!--<v-icon  >-->
                                <!--{{(isFav)?" mdi-star":" mdi-star-outline"}}-->
                             <!--</v-icon>-->
                         <!--</v-btn>-->
                     </v-card-actions>
                 </v-card>
            </v-flex>
        </v-layout>




            <v-layout wrap v-if="test_val" key="grids" >
                <v-flex md12 >
                   <directory_test></directory_test>
                </v-flex>
            </v-layout>
    </v-scroll-y-reverse-transition>
    </v-container>




</template>

<script>
    import directory_test from './directory_test'
    export default {
        components: {directory_test},
        name: "directory",
        data(){
            return{
                isFav:false,
                test_val:false
            }
        },
        methods:{
            test(){
                this.test_val=!this.test_val
            }
        },
        created(){
            this.$root.$emit('change_title', 'Справочники')
        }
    }
</script>

<style scoped>


</style>