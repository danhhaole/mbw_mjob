<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Company Detail</h1>
      <Button @click="$router.back()" variant="outline">
        Back
      </Button>
    </div>

    <div v-if="loading" class="flex justify-center py-8">
      <Spinner />
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else-if="currentCompany" class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ currentCompany.company_name }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Company Information
        </p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">ID</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ currentCompany.name }}
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Company Name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ currentCompany.company_name }}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Status</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ currentCompany.status || '-' }}
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" v-if="currentCompany.company_profile">
            <dt class="text-sm font-medium text-gray-500">Company Profile</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <pre>{{ JSON.stringify(currentCompany.company_profile, null, 2) }}</pre>
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Created</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ formatDate(currentCompany.creation) }}
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Last Modified</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ formatDate(currentCompany.modified) }}
            </dd>
          </div>
        </dl>
      </div>
      <div class="px-4 py-3 sm:px-6 bg-gray-50 border-t border-gray-200 flex justify-end">
        <Button @click="editCompany" variant="solid" class="mr-2">
          Edit
        </Button>
        <Button @click="deleteCompany" variant="solid" theme="red">
          Delete
        </Button>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500">Company not found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCompanyStore } from '@/features/company/store'
import { Button, Spinner } from 'frappe-ui'

const route = useRoute()
const router = useRouter()

// Reactive references that will be populated when the store is ready
const currentCompany = ref(null)
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  const companyStore = useCompanyStore();
  
  // Initialize the local refs with store values
  currentCompany.value = companyStore.currentCompany;
  loading.value = companyStore.loading;
  error.value = companyStore.error;
  
  // Watch for changes in the store properties
  watch(() => companyStore.currentCompany, (newVal) => {
    currentCompany.value = newVal;
  }, { immediate: true });
  
  watch(() => companyStore.loading, (newVal) => {
    loading.value = newVal;
  }, { immediate: true });
  
  watch(() => companyStore.error, (newVal) => {
    error.value = newVal;
  }, { immediate: true });
  
  const companyId = route.params.id
  if (companyId) {
    await companyStore.loadCompany(companyId)
  }
})

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const editCompany = () => {
  // Navigate to edit page or open edit modal
  // For now, we'll emit an event that parent component can handle
  router.push({ name: 'CompanyEdit', params: { id: currentCompany.value?.name } })
}

const deleteCompany = async () => {
  if (confirm(`Are you sure you want to delete the company "${currentCompany.value?.company_name}"?`)) {
    try {
      await companyStore.deleteCompany(currentCompany.value?.name)
      router.push({ name: 'CompaniesList' })
    } catch (error) {
      console.error('Error deleting company:', error)
    }
  }
}
</script>