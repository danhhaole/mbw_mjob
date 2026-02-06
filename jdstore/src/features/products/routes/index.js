export default [
  {
    path: '/products',
    name: 'ProductList',
    component: () => import('../views/ProductList.vue'),
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue'),
  }
]