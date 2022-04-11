import { createRouter, createWebHistory } from 'vue-router'

import DashboardLayout from '@/layouts/DashboardLayout'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: {
      auth: false,
    },
  },
  {
    path: '/',
    name: 'home',
    component: DashboardLayout,
    meta: {
      auth: true,
      roles: [2000, 3000],
    },
    children: [
      {
        path: '/home',
        name: 'ServiceList',
        component: () => import('@/views/Home'),
        meta: {
          auth: true,
          name: 'ホーム',
          roles: [2000, 3000],
        },
      },
    ],
  },
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  debugger
  let token = localStorage.getItem('access_token')
  if (to.matched.some((record) => record.meta.auth) && to.meta.auth) {
    // const user_info = JSON.parse(localStorage.getItem('user_info'))
    if (token) {
      next()
    } else {
      //There is no token, re authentication is required
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
    }
  } else {
    if (token) {
      next({
        path: '/'
      })
    }
  } 
  next()
})

export default router
