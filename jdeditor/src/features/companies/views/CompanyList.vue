<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Companies</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-for="company in companies" :key="company.name" class="border p-2 mb-2 rounded hover:bg-gray-50">
        <router-link :to="{ name: 'CompanyDetail', params: { id: company.name } }">
          <h2 class="font-semibold">{{ company.company_name }}</h2>
          <p class="text-gray-600 text-sm">{{ company.description }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCompaniesQuery } from '../queries'

const { data: companies, isLoading } = useCompaniesQuery()
</script>