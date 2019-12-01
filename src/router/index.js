import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component:Home,
    meta: { 
      keepAlive:false
     }
  },
  {
    path: '/category',
    name: 'category',
    component:() => import('../views/Category.vue'),
    meta: { 
      keepAlive:true
     }
  },
  {
    path:'/cart',
    name:'cart',
    component:() => import('../views/Cart.vue'),
    meta: { 
      keepAlive:false
     }
  },
  {
    path:'/profile',
    name:'profile',
    component:() => import('../views/Profile.vue'),
    meta: { 
      keepAlive:false
     }
  },
  {
    path:'/detail/:id',
    name:'detail',
    component:() => import('../views/Detail.vue'),
    
  },
  {
    path:'*',
    component:() => import('../views/Error.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
