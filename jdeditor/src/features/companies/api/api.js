import { createListResource, createResource } from 'frappe-ui'

export const fetchCompanies = async (params) => {
  const resource = createListResource({
    doctype: 'Company', // Thay đổi Doctype tương ứng nếu cần
    fields: ['name', 'company_name', 'description', 'logo'],
    ...params
  })
  return resource.reload()
}

export const fetchCompany = async (id) => {
  const resource = createResource({
    doctype: 'Company',
    name: id,
    auto: false
  })
  return resource.fetch()
}