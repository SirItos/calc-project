import Vue from 'vue'
import Router from 'vue-router'
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
        component: ()=>import('@/Pages/loginForm')
    },
    {
      path: '/',
      name: 'calculations',
      beforeEnter:ifAuth,
      component: () => import('@/Pages/calculations')
    },
      {
          path: '/calculator/:id',
          name: 'calculator',
          beforeEnter:ifAuth,
          component: () =>  import('@/Pages/calculator'),
          props:true
      },
      {
          path: '/history',
          name: 'history',
          beforeEnter:ifAuth,
          component: () => import('@/Pages/history')
      },
       {
          path: '/object/:id',
          name: 'object',
          beforeEnter:ifAuth,
          component: () =>import('@/Pages/history_object'),
          props: true
      },
      {
          path: '/directory',
          name: 'directory',
          beforeEnter:ifAuth,
          component:()=> import('@/Pages/directory')
      },
      {
          path: '/jsonout',
          name: 'jsonout',
          component:() => import('@/Pages/jsonOutput')
      }



  ]
})
