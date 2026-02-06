<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Product Detail</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <!-- Render product details here -->
      <div v-if="product">
        <h2>{{ product.item_name }}</h2>
        <p>Price: {{ product.standard_rate }}</p>
        <img v-if="product.image" :src="product.image" :alt="product.item_name" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useProductQuery } from '../api/queries'

const route = useRoute()
const { data: product, isLoading } = useProductQuery(route.params.id)
</script>