import { createListResource, createResource } from 'frappe-ui'

export const fetchProducts = async (params) => {
  const resource = createListResource({
    doctype: 'Item', // Giả sử doctype là Item
    fields: ['name', 'item_name', 'standard_rate', 'image'],
    ...params
  })
  return resource.reload()
}

export const fetchProduct = async (id) => {
  const resource = createResource({
    doctype: 'Item',
    name: id,
    auto: false
  })
  return resource.fetch()
}