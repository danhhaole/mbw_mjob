<template>
  <div class="p-6 max-w-2xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">{{ isEditing ? 'Edit Company' : 'Create Company' }}</h1>
      <Button @click="$router.back()" variant="outline">
        Back
      </Button>
    </div>

    <div class="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <Input
              v-model="formData.company_name"
              type="text"
              placeholder="Enter company name"
              class="mt-1 block w-full"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <Input
              v-model="formData.status"
              type="text"
              placeholder="Enter status"
              class="mt-1 block w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company Profile</label>
            <Textarea
              v-model="formData.company_profile_json"
              placeholder="Enter company profile as JSON"
              class="mt-1 block w-full"
              rows="6"
            />
            <p class="mt-1 text-sm text-gray-500">Enter company profile information in JSON format</p>
          </div>
        </div>

        <div class="mt-8 flex justify-end space-x-3">
          <Button type="button" @click="$router.back()" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="solid" :loading="submitting" :disabled="!isValid">
            {{ isEditing ? 'Update Company' : 'Create Company' }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCompanyStore } from '@/features/company/store'
import { Button, Input, Textarea } from 'frappe-ui'

const route = useRoute()
const router = useRouter()

const submitting = ref(false)
const formData = ref({
  company_name: '',  // Correct field name
  status: '',
  company_profile_json: ''
})

const isEditing = computed(() => !!route.params.id)

const isValid = computed(() => {
  return formData.value.company_name.trim().length > 0
})

onMounted(async () => {
  if (isEditing.value) {
    const companyStore = useCompanyStore();
    const company = await companyStore.loadCompany(route.params.id)
    
    if (company) {
      formData.value = {
        company_name: company.company_name || '',
        status: company.status || '',
        company_profile_json: company.company_profile ? JSON.stringify(company.company_profile, null, 2) : ''
      }
    }
  }
})

const handleSubmit = async () => {
  if (!isValid.value) return
  
  submitting.value = true
  try {
    let companyProfile = null
    if (formData.value.company_profile_json.trim()) {
      companyProfile = JSON.parse(formData.value.company_profile_json)
    }

    const companyData = {
      company_name: formData.value.company_name,
      status: formData.value.status,
      ...(formData.value.company_profile_json !== undefined && { company_profile_json: formData.value.company_profile_json })
    }

    const companyStore = useCompanyStore();
    if (isEditing.value) {
      await companyStore.updateCompany(route.params.id, companyData)
    } else {
      await companyStore.createCompany(companyData)
    }
    
    router.push({ name: 'CompaniesList' })
  } catch (error) {
    console.error(isEditing.value ? 'Error updating company:' : 'Error creating company:', error)
    // Show error notification to user
  } finally {
    submitting.value = false
  }
}
</script>