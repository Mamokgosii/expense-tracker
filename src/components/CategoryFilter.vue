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
      Filter by Category
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