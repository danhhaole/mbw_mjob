import { useQuery } from '@tanstack/vue-query'
import { fetchProducts, fetchProduct } from './index'

export const productKeys = {
  all: ['products'],
  lists: () => [...productKeys.all, 'list'],
  list: (filters) => [...productKeys.lists(), { filters }],
  details: () => [...productKeys.all, 'detail'],
  detail: (id) => [...productKeys.details(), id],
}

export const useProductsQuery = (filters) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => fetchProducts(filters),
    keepPreviousData: true,
  })
}

export const useProductQuery = (id) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  })
}