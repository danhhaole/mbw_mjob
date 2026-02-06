<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <!-- Render list here -->
      <div v-for="product in products" :key="product.name">{{ product.item_name }}</div>
    </div>
  </div>
</template>

<script setup>
import { useProductsQuery } from '../api/queries'

const { data: products, isLoading } = useProductsQuery()
</script>