import Vue from 'vue'
import Router from 'vue-router'
import calculator from '@/components/calculator'
import calculations from '@/components/calculations'
import ts from '@/components/ts'
import regions from '@/components/regions'
import counter from '@/components/counter'
import history from '@/components/history'
import object from '@/components/history_object'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'calculations',
      component: calculations
    },
      {
          path: '/calculator/:id',
          name: 'calculator',
          component: calculator,
          props:true
      },
      {
          path: '/car',
          name: 'ts',
          component: ts
      },
      {
          path: '/regions',
          name: 'regions',
          component: regions
      },
      {
          path: '/counter',
          name: 'counter',
          component: counter
      },
      {
          path: '/history',
          name: 'history',
          component: history,
      },
              {
                  path: '/object/:id',
                  name: 'object',
                  component: object,
                  props: true
              }


  ]
})
