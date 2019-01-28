import Vue from 'vue'
import Router from 'vue-router'
import calculator from '@/components/calculator'
import calculations from '@/components/calculations'
import ts from '@/components/ts'
import regions from '@/components/regions'
import counter from '@/components/counter'
import history from '@/components/history'
import object from '@/components/history_object'
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
          path: '/car',
          name: 'ts',
          beforeEnter:ifAuth,
          component: ts
      },
      {
          path: '/regions',
          name: 'regions',
          beforeEnter:ifAuth,
          component: regions
      },
      {
          path: '/counter',
          name: 'counter',
          beforeEnter:ifAuth,
          component: counter
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
              }


  ]
})
