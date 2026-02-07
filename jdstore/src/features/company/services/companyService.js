/**
 * Service layer for JDStore Company operations
 * Provides a clean interface for interacting with the Frappe backend
 */

// Import frappe call function
import { call } from 'frappe-ui';

export const companyService = {
  /**
   * Fetch all companies
   */
  async fetchAll(filters = {}, options = {}) {
    try {
      const params = {
        doctype: 'JDStore Company',
        fields: options.fields || ['name', 'company_name', 'status', 'creation', 'modified'],
        filters: filters || {},
        order_by: options.order_by || 'modified desc',
        limit_page_length: options.limit_page_length || 20,
        ...options
      };

      const response = await call('frappe.client.get_list', params);

      return {
        success: true,
        data: response.message || [],
        total_count: response.message?.length || 0
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch companies',
        data: []
      };
    }
  },

  /**
   * Fetch a single company by ID
   */
  async fetchById(id) {
    try {
      const response = await call('frappe.client.get', {
        doctype: 'JDStore Company',
        name: id
      });

      return {
        success: true,
        data: response.message || null
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch company',
        data: null
      };
    }
  },

  /**
   * Create a new company
   */
  async create(companyData) {
    try {
      // Process company profile if it exists
      const processedData = { ...companyData };
      if (processedData.company_profile_json) {
        processedData.company_profile = typeof processedData.company_profile_json === 'string'
          ? JSON.parse(processedData.company_profile_json)
          : processedData.company_profile_json;
        delete processedData.company_profile_json; // Remove the temporary field
      }

      const doc = {
        doctype: 'JDStore Company',
        ...processedData
      };

      const response = await call('frappe.client.insert', doc);

      return {
        success: true,
        data: response.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create company',
        data: null
      };
    }
  },

  /**
   * Update an existing company
   */
  async update(id, updateData) {
    try {
      // Process company profile if it exists
      const processedData = { ...updateData };
      if (processedData.company_profile_json !== undefined) {
        processedData.company_profile = typeof processedData.company_profile_json === 'string'
          ? JSON.parse(processedData.company_profile_json)
          : processedData.company_profile_json;
        delete processedData.company_profile_json; // Remove the temporary field
      }

      // Use set_value to update specific fields
      const response = await call('frappe.client.set_value', {
        doctype: 'JDStore Company',
        name: id,
        fieldname: Object.keys(processedData),
        value: Object.values(processedData)
      });

      // After updating, fetch the updated record to return complete data
      const updatedRecordResponse = await call('frappe.client.get', {
        doctype: 'JDStore Company',
        name: id
      });

      return {
        success: true,
        data: {
          ...response.message,
          doc: updatedRecordResponse.message  // Include the full updated document
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update company',
        data: null
      };
    }
  },

  /**
   * Delete a company
   */
  async delete(id) {
    try {
      const response = await call('frappe.client.delete', {
        doctype: 'JDStore Company',
        name: id
      });

      return {
        success: true,
        data: response.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete company',
        data: null
      };
    }
  }
};