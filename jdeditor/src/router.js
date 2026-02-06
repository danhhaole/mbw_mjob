import { createRouter, createWebHistory } from 'vue-router'
import companyRoutes from '@/features/companies/routes'

const routes = [
  {
    path: '/',
    redirect: '/companies',
  },
  ...companyRoutes,
]

let router = createRouter({
  history: createWebHistory('/jdeditor'),
  routes,
})

export default router
