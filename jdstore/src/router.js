import { createRouter, createWebHistory } from 'vue-router'
import { companyRoutes } from '@/features/company'

const routes = [
  {
    path: '/',
    redirect: '/companies',
  },
  ...companyRoutes,
]

let router = createRouter({
  history: createWebHistory('/jdstore'),
  routes,
})

export default router
