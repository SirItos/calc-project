// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import form_field from "../static/form_fields.json"
import underscore from "vue-underscore"
// import Vue2Storage from 'vue2-storage'







Vue.use(Vuetify, { theme: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        grey:'#ddd'
}});


// Vue.use(Vue2Storage,{
//     prefix: 'app_',
//     driver: 'local',
//     ttl: 60 * 60 * 24 * 1000
// });
Vue.config.productionTip = false
Vue.use(underscore);
// let ls = new Vue();
// export const Local= ls.$storage;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
    data:{
      form_field:form_field,

    },
});
