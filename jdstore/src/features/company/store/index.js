import { defineStore } from 'pinia'
import { companyService } from '../services/companyService'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companies: [],
    currentCompany: null,
    loading: false,
    error: null
  }),

  actions: {
    async loadCompanies(filters = {}) {
      this.loading = true
      try {
        const result = await companyService.fetchAll(
          filters, 
          { fields: ['name', 'company_name', 'status', 'creation', 'modified'] }
        )
        if (result.success) {
          this.companies = result.data || []
          this.error = null
        } else {
          this.error = result.error
          console.error('Error loading companies:', result.error)
        }
      } catch (error) {
        this.error = error.message || 'Failed to load companies'
        console.error('Error loading companies:', error)
      } finally {
        this.loading = false
      }
    },

    async loadCompany(id) {
      this.loading = true
      try {
        const result = await companyService.fetchById(id)
        if (result.success) {
          this.currentCompany = result.data
          this.error = null
          return result.data
        } else {
          this.error = result.error
          console.error('Error loading company:', result.error)
        }
      } catch (error) {
        this.error = error.message || 'Failed to load company'
        console.error('Error loading company:', error)
      } finally {
        this.loading = false
      }
    },

    async createCompany(companyData) {
      this.loading = true
      try {
        const result = await companyService.create(companyData)
        if (result.success) {
          // Reload companies to include the new one
          await this.loadCompanies()
          this.error = null
          return result.data
        } else {
          this.error = result.error
          console.error('Error creating company:', result.error)
          throw new Error(result.error)
        }
      } catch (error) {
        this.error = error.message || 'Failed to create company'
        console.error('Error creating company:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCompany(id, companyData) {
      this.loading = true
      try {
        const result = await companyService.update(id, companyData)
        if (result.success) {
          // Reload the specific company to get the updated values
          const updatedCompany = await companyService.fetchById(id);
          
          if (updatedCompany.success) {
            // Update the current company in the list
            const index = this.companies.findIndex(company => company.name === id)
            if (index !== -1) {
              this.companies[index] = updatedCompany.data;
            }
            // If updating the current company, update the currentCompany state too
            if (this.currentCompany && this.currentCompany.name === id) {
              this.currentCompany = updatedCompany.data;
            }
          }
          
          this.error = null
          return result.data
        } else {
          this.error = result.error
          console.error('Error updating company:', result.error)
          throw new Error(result.error)
        }
      } catch (error) {
        this.error = error.message || 'Failed to update company'
        console.error('Error updating company:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteCompany(id) {
      this.loading = true
      try {
        const result = await companyService.delete(id)
        if (result.success) {
          // Remove the deleted company from the list
          this.companies = this.companies.filter(company => company.name !== id)
          // If the current company is the one being deleted, clear it
          if (this.currentCompany && this.currentCompany.name === id) {
            this.currentCompany = null
          }
          this.error = null
          return result.data
        } else {
          this.error = result.error
          console.error('Error deleting company:', result.error)
          throw new Error(result.error)
        }
      } catch (error) {
        this.error = error.message || 'Failed to delete company'
        console.error('Error deleting company:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})