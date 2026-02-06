import { createRouter, createWebHistory } from 'vue-router'
import productRoutes from '@/features/products/routes'
import companyRoutes from '@/features/company/routes'

const routes = [
  {
    path: '/',
    redirect: '/products',
  },
  ...productRoutes,
  ...companyRoutes,
]

let router = createRouter({
  history: createWebHistory('/jdstore'),
  routes,
})

export default router
