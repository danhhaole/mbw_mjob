export default [
  {
    path: '/companies',
    name: 'CompanyList',
    component: () => import('../views/CompanyList.vue'),
  },
  {
    path: '/companies/:id',
    name: 'CompanyDetail',
    component: () => import('../views/CompanyDetail.vue'),
  }
]