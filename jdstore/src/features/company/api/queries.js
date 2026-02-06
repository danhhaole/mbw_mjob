import { useQuery } from '@tanstack/vue-query'
import { fetchCompanies, fetchCompany } from './index'

export const companyKeys = {
  all: ['companies'],
  lists: () => [...companyKeys.all, 'list'],
  list: (filters) => [...companyKeys.lists(), { filters }],
  details: () => [...companyKeys.all, 'detail'],
  detail: (id) => [...companyKeys.details(), id],
}

export const useCompaniesQuery = (filters) => {
  return useQuery({
    queryKey: companyKeys.list(filters),
    queryFn: () => fetchCompanies(filters),
    keepPreviousData: true,
  })
}

export const useCompanyQuery = (id) => {
  return useQuery({
    queryKey: companyKeys.detail(id),
    queryFn: () => fetchCompany(id),
    enabled: !!id,
  })
}