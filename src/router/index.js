import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'primarylayout',
      component: () => import('../layouts/primarylayout.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: '/transaksi',
          name: 'transaksi',
          component: () => import('../views/Transaksi.vue')
        },
        {
          path: '/provider',
          name: 'provider',
          component: () => import('../views/Provider.vue')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('../views/Users.vue')
        },
      ]
    },
    
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    }
  ]
})

export default router
