<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Company Detail</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <!-- Render company details here -->
      <div v-if="company">
        <h2>{{ company.company_name }}</h2>
        <p>{{ company.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCompanyQuery } from '../api/queries'

const route = useRoute()
const { data: company, isLoading } = useCompanyQuery(route.params.id)
</script>