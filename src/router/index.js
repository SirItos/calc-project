import Vue from 'vue'
import Router from 'vue-router'
import calculator from '@/components/calculator'
import calculations from '@/components/calculations'
import history from '@/components/history'
import object from '@/components/history_object'
import directory from '@/components/directory'
import directory_test from '@/components/directory_test'
import store from '../store'

Vue.use(Router)

const ifAuth = async (to,from,next)=>{
    if (store.getters['user/isAuth']){
        next();
        return
    }
    next('/login')
}
const ifNotAuth = async (to,from,next)=>{
    if (!store.getters['user/isAuth']){
        next();
        return
    }
    next('/')
}


export default new Router({
  routes: [
    {
        path:'/login',
        name:'loginForm',
        beforeEnter:ifNotAuth,
        component: ()=>import('@/components/loginForm')
    },
    {
      path: '/',
      name: 'calculations',
      beforeEnter:ifAuth,
      component: calculations
    },
      {
          path: '/calculator/:id',
          name: 'calculator',
          beforeEnter:ifAuth,
          component: calculator,
          props:true
      },
      {
          path: '/history',
          name: 'history',
          beforeEnter:ifAuth,
          component: history,
      },
       {
          path: '/object/:id',
          name: 'object',
          beforeEnter:ifAuth,
          component: object,
          props: true
      },
      {
          path: '/directory',
          name: 'directory',
          beforeEnter:ifAuth,
          component:directory
      },
      {
          path: '/directory_test',
          name: 'directory_test',
          beforeEnter:ifAuth,
          component:directory_test
      }


  ]
})
