import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { fetchJobs, updateJobStatus } from './api'

// QUERY KEY FACTORY - Rất quan trọng để quản lý cache
export const jobKeys = {
  all: ['jobs'],
  lists: () => [...jobKeys.all, 'list'],
  list: (filters) => [...jobKeys.lists(), { filters }],
  details: () => [...jobKeys.all, 'detail'],
  detail: (id) => [...jobKeys.details(), id],
}

// COMPOSABLE: Lấy danh sách Jobs
export const useJobsQuery = (filters) => {
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: () => fetchJobs(filters),
    keepPreviousData: true, // Giữ data cũ khi đổi trang/filter
  })
}

// COMPOSABLE: Update Job
export const useUpdateJobMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateJobStatus,
    onSuccess: () => {
      // Invalidate cache để danh sách tự động cập nhật
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() })
    },
  })
}