<template>
    <Download
        :download-data="getSomeJsonData"
        file-type="json"
        file-name="Test__JSON"
        button-text="Download JSON"
    />
</template>

<script>
    import Download from '@/components/Download'
    import {mapGetters} from "vuex"
    export default {
        name: "json-output",
        data(){
            return{
                json_set:null
            }
        },
        components:{
            Download
        },
        computed:{
            ...mapGetters({
                getSomeJsonData: "calculations/getSomeJsonData"
            }),
        },
        created(){
            this.json_set = this.getSomeJsonData
        }
    }
</script>


<style scoped>

</style>