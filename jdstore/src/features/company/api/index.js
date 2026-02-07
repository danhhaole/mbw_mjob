import { createListResource, createResource } from 'frappe-ui';
import { companyService } from '../services/companyService';

export const fetchCompanies = async (params) => {
  const resource = createListResource({
    doctype: 'JDStore Company',
    fields: ['name', 'company_name', 'status'],
    ...params
  });
  return resource.reload();
};

export const fetchCompany = async (id) => {
  const resource = createResource({
    doctype: 'JDStore Company',
    name: id,
    auto: false
  });
  return resource.fetch();
};

export const createCompany = async (data) => {
  const result = await companyService.create(data);
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
};

export const updateCompany = async (id, data) => {
  const result = await companyService.update(id, data);
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
};

export const deleteCompany = async (id) => {
  const result = await companyService.delete(id);
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
};