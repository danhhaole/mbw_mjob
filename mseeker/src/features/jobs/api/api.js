import { createListResource, createResource } from 'frappe-ui'

// Giả sử dùng frappe-ui hoặc axios
export const fetchJobs = async (params) => {
  // Logic gọi API lấy danh sách
  const resource = createListResource({
    doctype: 'Job',
    fields: ['name', 'title', 'status'],
    ...params
  })
  return resource.reload()
}

export const updateJobStatus = async ({ id, status }) => {
  // Logic gọi API update
  return createResource({
    url: 'mbw_mjob.api.update_status',
    params: { id, status }
  }).fetch()
}