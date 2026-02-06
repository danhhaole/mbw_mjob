import { createRouter, createWebHistory } from 'vue-router'
import jobRoutes from '@/features/jobs/routes'

const routes = [
  {
    path: '/',
    redirect: '/jobs',
  },
  ...jobRoutes,
]

let router = createRouter({
  history: createWebHistory('/mseeker'),
  routes,
})

export default router
