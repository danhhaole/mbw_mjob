<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Companies</h1>
      <Button @click="openCreateModal" variant="solid">
        Add Company
      </Button>
    </div>

    <div v-if="loading" class="flex justify-center py-8">
      <Spinner />
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr class="bg-gray-50">
            <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="company in companies" :key="company.name">
            <td class="py-4 px-4 whitespace-nowrap">{{ company.company_name }}</td>
            <td class="py-4 px-4 whitespace-nowrap">{{ company.status || '-' }}</td>
            <td class="py-4 px-4 whitespace-nowrap">
              <Button @click="openEditModal(company)" variant="outline" class="mr-2">
                Edit
              </Button>
              <Button @click="confirmDelete(company)" variant="outline" theme="red">
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create/Edit Modal -->
    <Dialog v-model="showModal" :options="{ title: modalTitle }">
      <template #body-title>
      <h3 class="text-2xl font-semibold text-blue-600">
        Custom Title with Styling1
      </h3>
    </template>
      <template #body-content>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <Input
                v-model="formData.company_name"
                type="text"
                placeholder="Enter company name"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Input
                v-model="formData.status"
                type="text"
                placeholder="Enter status"
              />
            </div>
          </div>
        </form>
      </template>

      <template #actions="{ close }">
        <div class="flex flex-row-reverse gap-2">
          <Button type="submit" variant="solid" :loading="submitting" @click="handleSubmit">
            {{ isEditing ? 'Update' : 'Create' }}
          </Button>
          <Button variant="outline" @click="close">
            Cancel
          </Button>
        </div>
      </template>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog v-model="showDeleteDialog">
      <template #body-title>
        <h3 class="text-2xl font-semibold text-blue-600">
          Confirm Delete
        </h3>
      </template>

      <template #body-content>
        <p>Are you sure you want to delete the company "{{ deleteCompanyName }}"?</p>
      </template>

      <template #actions="{ close }">
        <div class="flex flex-row-reverse gap-2">
          <Button @click="handleDeleteConfirmed" variant="solid" theme="red" :loading="deleting">
            Delete
          </Button>
          <Button variant="outline" @click="close">
            Cancel
          </Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useCompanyStore } from '@/features/company/store'
import { Button, Input, Dialog, Spinner } from 'frappe-ui'

const showModal = ref(false)
const showDeleteDialog = ref(false)
const submitting = ref(false)
const deleting = ref(false)
const isEditing = ref(false)
const deleteCompanyId = ref(null)
const deleteCompanyName = ref('')
const formData = ref({
  company_name: '',  // Correct field name
  status: '',
  name: '',  // Add name field for editing
  company_profile:{}
})

// Reactive references that will be populated when the store is ready
const companies = ref([])
const loading = ref(false)
const error = ref(null)

const modalTitle = computed(() => {
  return isEditing.value ? 'Edit Company' : 'Create Company'
})

onMounted(async () => {
  const companyStore = useCompanyStore();
  
  // Initialize the local refs with store values
  companies.value = companyStore.companies;
  loading.value = companyStore.loading;
  error.value = companyStore.error;
  
  // Watch for changes in the store properties
  watch(() => companyStore.companies, (newVal) => {
    companies.value = newVal;
  }, { immediate: true });
  
  watch(() => companyStore.loading, (newVal) => {
    loading.value = newVal;
  }, { immediate: true });
  
  watch(() => companyStore.error, (newVal) => {
    error.value = newVal;
  }, { immediate: true });
  
  await companyStore.loadCompanies();
})

const openCreateModal = () => {
  resetForm()
  isEditing.value = false
  showModal.value = true
}

const openEditModal = (company) => {
  formData.value = {
    name: company.name,
    company_name: company.company_name,
    status: company.status
  }
  isEditing.value = true
  showModal.value = true
}

const resetForm = () => {
  formData.value = {
    company_name: '',
    status: '',
    company_profile:{}
  }
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    const companyStore = useCompanyStore();
    if (isEditing.value) {
      await companyStore.updateCompany(formData.value.name, {
        company_name: formData.value.company_name,
        status: formData.value.status,
        company_profile:{}
      })
    } else {
      await companyStore.createCompany({
        company_name: formData.value.company_name,
        status: formData.value.status,
        company_profile:{}
      })
    }
    showModal.value = false
    resetForm()
  } catch (err) {
    console.error('Submit error:', err)
  } finally {
    submitting.value = false
  }
}

const confirmDelete = (company) => {
  deleteCompanyId.value = company.name
  deleteCompanyName.value = company.company_name
  showDeleteDialog.value = true
}

const handleDeleteConfirmed = async () => {
  deleting.value = true
  try {
    await companyStore.deleteCompany(deleteCompanyId.value)
    showDeleteDialog.value = false
  } catch (err) {
    console.error('Delete error:', err)
  } finally {
    deleting.value = false
  }
}
</script>