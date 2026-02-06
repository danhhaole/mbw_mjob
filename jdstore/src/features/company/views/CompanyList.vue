<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Companies</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <!-- Render list here -->
      <div v-for="company in companies" :key="company.name">{{ company.company_name }}</div>
    </div>
  </div>
</template>

<script setup>
import { useCompaniesQuery } from '../api/queries'

const { data: companies, isLoading } = useCompaniesQuery()
</script>