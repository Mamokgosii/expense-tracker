<script setup lang="ts">
import { ref, watch } from 'vue'

const sortOption = ref('newest')

const emit = defineEmits<{
  (e: 'sort', option: string): void
}>()

watch(sortOption, (value) => {
  emit('sort', value)
})
</script>

<template>
  <div class="sort-expenses">
    <select
      id="sort"
      v-model="sortOption"
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="highest">Highest Amount</option>
      <option value="lowest">Lowest Amount</option>
      <option value="az">Description (A-Z)</option>
      <option value="za">Description (Z-A)</option>
    </select>
  </div>
</template>

<style scoped>
.sort-expenses {
  width: 180px;
}

.sort-expenses select {
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 0.95rem;
  background: white;
  box-sizing: border-box;
}

.sort-expenses select:focus {
  outline: none;
  border-color: #2563eb;
}
</style>