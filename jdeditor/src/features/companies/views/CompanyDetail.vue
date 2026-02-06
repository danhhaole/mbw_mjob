<template>
  <div class="p-4">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="company">
      <h1 class="text-2xl font-bold mb-2">{{ company.company_name }}</h1>
      <p class="text-gray-700">{{ company.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCompanyQuery } from '../queries'

const route = useRoute()
const { data: company, isLoading } = useCompanyQuery(route.params.id)
</script>