<template>

</template>

<script>
    export default {
        name: "history_list",
        data:()=>({
            headers: [
                {
                    text: 'Страхователь',
                    align: 'center',
                    value: 'ins'
                },
                { text: 'ТС', value: 'ts',     align: 'center',},
                { text: 'Лимит КАСКО', value: 'klimit',     align: 'center', },
                { text: 'Премия КАСКО', value: 'kaward' ,     align: 'center',},
                { text: 'Лимит АГО', value: 'alimit',     align: 'center', },
                { text: 'Премия АГО', value: 'aaward' ,     align: 'center',},
                { text: 'Лимит НС', value: 'nslimit',     align: 'center', },
                { text: 'Премия НС', value: 'nsaward' ,     align: 'center',},
                { text: 'Статус', value: 'status' ,     align: 'center',},
            ],

            search:''
        }),
        methods:{
            go_to_object(id){
                let stat=1;
                this.$root.$router.push("/object/"+stat);
            },
            status_class(status){
                return(status==="Ожидает подтверждения")?"orange-lighten-1":"";
            }
        }
    }
</script>

<style scoped>

</style>