import { createRouter, createWebHistory } from 'vue-router'
import CompaniesList from '@/features/company/components/CompaniesList.vue'
import CompanyDetail from '@/features/company/components/CompanyDetail.vue'
import CompanyForm from '@/features/company/components/CompanyForm.vue'

export const companyRoutes = [
  {
    path: '/companies',
    name: 'CompaniesList',
    component: CompaniesList,
    meta: { title: 'Companies' }
  },
  {
    path: '/companies/:id',
    name: 'CompanyDetail',
    component: CompanyDetail,
    props: true,
    meta: { title: 'Company Detail' }
  },
  {
    path: '/companies/new',
    name: 'CompanyNew',
    component: CompanyForm,
    meta: { title: 'New Company' }
  },
  {
    path: '/companies/:id/edit',
    name: 'CompanyEdit',
    component: CompanyForm,
    props: true,
    meta: { title: 'Edit Company' }
  }
]