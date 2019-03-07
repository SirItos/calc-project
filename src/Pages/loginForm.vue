<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex md10 sm10 lg6 >
                <v-form ref="form" :value="valid" lazy-validation >
                <v-card >
                    <v-card-title class="justify-center pl-5 pr-5  ">
                        <span class="headline" >Вход в систему</span>
                    </v-card-title >


                        <v-card-text class="pl-5 pr-5">
                        <v-text-field
                              v-model="login"
                              :rules="[v => !!v || 'Укажите Логин!']"
                              label="Логин"
                              type="text"
                              prepend-icon="mdi-account"
                              required
                        ></v-text-field>
                        <v-text-field
                                v-model="password"
                                :rules="[v => !!v || 'Укажите Пароль!']"
                                label="Пароль"
                                :append-icon="show ? 'visibility_off' : 'visibility'"
                                :type="show ? 'text' : 'password'"
                                prepend-icon="mdi-lock"
                                required
                                @click:append="show = !show"
                        ></v-text-field>
                        </v-card-text>
                    <v-card-actions class=" pl-5 pr-5">
                        <v-btn
                                class="mt-4 mb-4 ml-2 mr-2"
                                large
                                block
                                color="primary"
                                @click="enter()"
                        >Вход</v-btn>
                    </v-card-actions>

                </v-card>
                </v-form>
            </v-flex>

        </v-layout>
        <v-dialog
                v-model="dialog"
                persistent
                max-width="400"
        >
            <v-card
                    class="pa-2"
                    color="white"
            >     <v-card-title class="justify-center headline">
               Загрузка....
                </v-card-title>
                <v-card-text >

                    <v-progress-linear
                            indeterminate
                            color="primary"
                            class="mb-4"

                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-snackbar
                v-model="snackbar"
                color="error"
                multi-line="multi-line"
                :timeout=3000
                top
        >
            Ошибка авторизации!
            <v-btn
                    dark
                    flat
                    @click="snackbar = false"
            >
                <v-icon size="2em">mdi-close</v-icon>
            </v-btn>
        </v-snackbar>
    </v-container>


</template>

<script>
    import {mapActions,mapGetters} from "vuex"
    export default {
        name: "login-form",
        data(){
            return{
                login:'',
                password:'',
                valid:true,
                show:false,
                dialog:false,
                snackbar:false
,            }
        },
        computed:{
            ...mapGetters({
                authIs:'user/isAuth'
            })
        },
        methods:{
            ...mapActions({
                SignIn:'user/login',
                UserData:'user/getUserData'
            }),
           async enter(){
                let self= this;
               if (this.$refs.form.validate()) {
                   let obj = {
                       'login': self.login,
                       'password': self.password,
                       'app_name': 'CalcClient'
                   };
                   this.dialog=!this.dialog;
                   await self.SignIn(obj);
                   if (self.authIs){
                       self.UserData();
                       self.dialog=false;
                       self.$router.push('/')
                   }else{
                       self.dialog=false;
                       self.snackbar=true;
                   }
               }
            }
        }
    }
</script>

<style scoped>

</style>