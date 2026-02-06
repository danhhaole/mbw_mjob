import { createRouter, createWebHistory } from 'vue-router'
import dashboardRoutes from '@/features/dashboard/routes'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  ...dashboardRoutes,
]

let router = createRouter({
  history: createWebHistory('/mjob'),
  routes,
})

export default router
