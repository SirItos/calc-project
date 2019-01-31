<template>
  <v-app >
    <!--Боковая панель-->
      <v-slide-x-transition >
    <v-navigation-drawer
      permanent
      :mini-variant="miniVariant"
      :value="true"
      fixed
      dark
      app
      v-if="this.is_auth"
    >
      <v-list class="pt-0 pb-0">

        <v-tooltip right :disabled="!miniVariant"   >
        <v-list-tile
          slot="activator"
          value="true"
          ripple
          avatar
          @click.stop="miniVariant = !miniVariant"
          >
          <v-list-tile-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content v-if="!miniVariant"   class="white--text text-truncate">
            Свернуть меню
          </v-list-tile-content>
          <v-spacer v-if="!miniVariant"></v-spacer>
          <v-list-tile-action :class="miniVariant?'go_left_pls':''">
            <v-flex d-flex >
            <v-icon class="d-flex rotateble" style="justify-content: flex-end" :class="rotate_cehvron" size="30" >mdi-chevron-left</v-icon>
            </v-flex>
          </v-list-tile-action>

        </v-list-tile>
          <span>Развернуть меню</span>
        </v-tooltip>
        <v-divider ></v-divider>
        <v-tooltip right :disabled="!miniVariant"   >
          <v-list-tile
                  active-class="light-blue"
                  slot="activator"
                  ripple
                  avatar
                  to="/"
          >
            <v-list-tile-avatar>
              <v-icon>
                mdi-home
              </v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content   class="white--text text-truncate">
              Главная
            </v-list-tile-content>


          </v-list-tile>
          <span>Главная</span>
        </v-tooltip>
        <v-divider inset></v-divider>
        <v-tooltip right :disabled="!miniVariant"   >
        <v-list-tile
                active-class="light-blue"
                slot="activator"
                :class="active_class_calc"
                ripple
                avatar
                to="/calculator/new"
        >
          <v-list-tile-avatar>
              <v-icon>
                mdi-calculator
              </v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content   class="white--text text-truncate">
              Рассчеты
          </v-list-tile-content>


        </v-list-tile>
          <span>Рассчеты</span>
        </v-tooltip>
        <v-divider inset></v-divider>
        <v-tooltip right :disabled="!miniVariant"   >
          <v-list-tile
                  active-class="light-blue"
                  :class="active_class"
                  slot="activator"
                  avatar
                  ripple
                  to="/history"
          >
            <v-list-tile-avatar>
              <v-icon>mdi-history</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content class="white--text">

              <v-list-tile-title>Готовые рассчеты</v-list-tile-title>


            </v-list-tile-content>
          </v-list-tile>
          <span>Готовые рассчеты</span>
        </v-tooltip>
        <v-tooltip right :disabled="!miniVariant"   >
          <v-list-tile
                  active-class="light-blue"

                  slot="activator"
                  avatar
                  ripple
                  to="/directory"
          >
            <v-list-tile-avatar>
              <v-icon>mdi-notebook</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content class="white--text">

              <v-list-tile-title>Справочники</v-list-tile-title>


            </v-list-tile-content>
          </v-list-tile>
          <span>Справочная информация</span>
        </v-tooltip>

      </v-list>

      <!--<v-list subheader>-->
        <!--<v-subheader>-->
          <!--Справочники-->
        <!--</v-subheader>-->
        <!--<v-divider ></v-divider>-->
        <!--<v-list class="pt-0">-->
          <!--<v-tooltip right :disabled="!miniVariant"   >-->
          <!--<v-list-tile-->
                  <!--active-class="light-blue"-->
                  <!--slot="activator"-->
                  <!--avatar-->
                  <!--ripple-->
                  <!--to="/car"-->
          <!--&gt;-->
            <!--<v-list-tile-avatar>-->
              <!--<v-icon>mdi-car</v-icon>-->
            <!--</v-list-tile-avatar>-->
            <!--<v-list-tile-content class="white&#45;&#45;text">-->

                  <!--<v-list-tile-title>ТС</v-list-tile-title>-->


            <!--</v-list-tile-content>-->
          <!--</v-list-tile>-->
            <!--<span>Транспортное средство</span>-->
          <!--</v-tooltip>-->
          <!--<v-divider inset></v-divider>-->
          <!--<v-tooltip right :disabled="!miniVariant"   >-->
          <!--<v-list-tile-->
                  <!--active-class="light-blue"-->
                  <!--slot="activator"-->
                  <!--avatar-->
                  <!--ripple-->
                  <!--to="/regions"-->
          <!--&gt;-->
            <!--<v-list-tile-avatar>-->
              <!--<v-icon>mdi-map-legend</v-icon>-->
            <!--</v-list-tile-avatar>-->
            <!--<v-list-tile-content class="white&#45;&#45;text">-->

              <!--<v-list-tile-title>Регион</v-list-tile-title>-->


            <!--</v-list-tile-content>-->
          <!--</v-list-tile>-->
            <!--<span>Регионы</span>-->
          <!--</v-tooltip>-->
          <!--<v-divider inset></v-divider>-->
          <!--<v-tooltip right :disabled="!miniVariant"   >-->
          <!--<v-list-tile-->
                  <!--active-class="light-blue"-->
                  <!--slot="activator"-->
                  <!--avatar-->
                  <!--ripple-->
                  <!--to="/counter"-->
          <!--&gt;-->
            <!--<v-list-tile-avatar>-->
              <!--<v-icon>mdi-counter</v-icon>-->
            <!--</v-list-tile-avatar>-->
            <!--<v-list-tile-content class="white&#45;&#45;text">-->

              <!--<v-list-tile-title>Коэфиценты</v-list-tile-title>-->


            <!--</v-list-tile-content>-->
          <!--</v-list-tile>-->
            <!--<span>Коэффиценты</span>-->
          <!--</v-tooltip>-->
          <!--<v-divider ></v-divider>-->

        <!--</v-list>-->
      <!--</v-list>-->
    </v-navigation-drawer>
      </v-slide-x-transition>

    <!--Верзняя панель-->
      <v-slide-y-transition >
    <v-toolbar
            absolute
      scroll-off-screen
      app
      style="background-color: transparent;"
      flat
      v-if="this.is_auth"
    >
      <v-toolbar-title class="text-uppercase">
        {{title}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-fade-transition>
        <div class="d-inline-flex align-center" v-if="userData!={}">
          <v-icon color="black"   key="user_icon" >mdi-account</v-icon>
          <span class="mr-4 ml-2 text-uppercase " key="user_name" >
            {{userData.name}}
          </span>
        </div>
      </v-fade-transition>
      <v-btn icon flat @click="logout_confirm=true">
        <v-icon class="trf">mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
      </v-slide-y-transition>

    <!--Контент-->
    <v-content>

      <v-scroll-y-reverse-transition mode="out-in">

      <router-view v-scroll="onScroll"/>

      </v-scroll-y-reverse-transition>

      <v-scale-transition
        origin="center center"
      >
      <v-btn
              v-if="offsetY>200"
              fab
              fixed
              bottom
              right
              round
              color="info"
              style="margin-right:10px;margin-bottom:40px"
              @click="$vuetify.goTo(0,{duration:300, easing:'easeOutQuad'})"
      >
         <v-icon size="3em">mdi-chevron-up</v-icon>
      </v-btn>
      </v-scale-transition>
    </v-content>

    <!--Футтер-->
    <v-footer  inset color="transparent" app>
      <div class="d-block pr-4" style=" width:100%; text-align: right" >
       Коник Никита&copy; 2018
      </div>
      <!--<v-btn @click="test_api()">TEST</v-btn>-->
    </v-footer>

    <!--Форма подтверждения выхода-->
    <v-dialog
            v-model="logout_confirm"
            max-width="300"
    >
      <v-card>
        <v-card-title class="headline">Выход</v-card-title>

        <v-card-text class="subheading">
          Вы уверены что хотите выйти?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
                  color="grey darken-1"
                  flat="flat"
                  @click="logout_confirm = false"
          >
            Отмета
          </v-btn>

          <v-btn
                  color="info"
                  flat="flat"
                  @click="()=>{this.logout_confirm = false; this.logout()}"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import {mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  data () {
    return {
      miniVariant: true,
      title: 'Рассчеты',
        offsetY:0,
        logout_confirm:false
    }
  },
  name: 'App',
    computed:{
        ...mapGetters({
            is_auth:'user/isAuth',
            userData:'user/getUserData'
        }),
        rotate_cehvron(){
            return (this.miniVariant)?'rotate-right':'rotate-left';
        },
        active_class(){

           return (this.$root.$route.name === 'object')?'light-blue':'';
        },
        active_class_calc(){
            return (this.$root.$route.name === 'calculator')?'light-blue':'';
        }
    },
    created(){
      let self=this;

      this.$root.$on('change_title',function(title){
          self.title=(title)||self.title;
      })

    },
    destroyed(){
      this.$root.$off('change_title');
      this.$root.$off('login_form');

    },
    methods:{
        ...mapActions({
            action:'user/login',
            sign_out:'user/logout',
            clean:'calculations/clear'
        }),
        onScroll(e){
            this.offsetY=window.pageYOffset;
        },
        logout(){
            this.sign_out();
            // this.$router.push('/login');
            this.clean();
        }

    }
}
</script>
<style scoped>
  .rotateble::before{
    -webkit-transition: 0.3s;
    -moz-transition:  0.3s;
    -ms-transition:  0.3s;
    -o-transition:  0.3s;
    transition:  0.3s;
  }
  .visb_tooltips{
    opacity: 1 !important;
  }
  .hidden_tooltips{
    opacity: 0!important;
  }
  .go_left_pls{
    -webkit-transform: translateX(-56px);
    -moz-transform: translateX(-56px);
    -ms-transform: translateX(-56px);
    -o-transform: translateX(-56px);
    transform: translateX(-56px);
  }
  .rotate-left::before{
    -webkit-transform:  rotate(0deg);
    -moz-transform:  rotate(0deg);
    -ms-transform:  rotate(0deg);
    -o-transform:  rotate(0deg);
    transform:  rotate(0deg);
  }
  .rotate-right::before{
    -webkit-transform:  rotate(-180deg);
    -moz-transform:  rotate(-180deg);
    -ms-transform:  rotate(-180deg);
    -o-transform:  rotate(-180deg);
    transform:  rotate(-180deg);
    
  }
  .as-hidden{
    display: none;
  }
  .trf{
    -webkit-transform: translateX(3px);
    -moz-transform: translateX(3px);
    -ms-transform: translateX(3px);
    -o-transform: translateX(3px);
    transform: translateX(3px);
  }
</style>
