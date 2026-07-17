<script setup lang="ts">
import { ref, watch } from 'vue'
import { categories } from '../constants/categories'

const filterCategories = ['All', ...categories]

const selectedCategory = ref('All')

const emit = defineEmits<{
  (e: 'filter', category: string): void
}>()

watch(selectedCategory, (category) => {
  emit('filter', category)
})
</script>

<template>
  <div class="category-filter">
    <label for="category-filter">
      Filter Expenses
    </label>

    <select
      id="category-filter"
      v-model="selectedCategory"
    >
      <option
        v-for="category in filterCategories"
        :key="category"
        :value="category"
      >
        {{ category }}
      </option>
    </select>
  </div>
</template>
<style scoped>
.category-filter {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.category-filter label {
  display: block;
  margin-bottom: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
}

.category-filter select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  color: #111827;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-filter select:hover {
  border-color: #2563eb;
}

.category-filter select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
</style>