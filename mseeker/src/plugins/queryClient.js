import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

// Cấu hình mặc định tối ưu
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Tắt tự động fetch lại khi focus tab (tùy nhu cầu)
      retry: 1, // Chỉ thử lại 1 lần nếu lỗi
      staleTime: 1000 * 60 * 5, // Data được coi là "tươi" trong 5 phút
    },
  },
})

export const vueQueryOptions = {
  queryClient,
}

// Cách dùng trong main.js:
// import { VueQueryPlugin } from '@tanstack/vue-query'
// import { vueQueryOptions } from './plugins/queryClient'
// app.use(VueQueryPlugin, vueQueryOptions)