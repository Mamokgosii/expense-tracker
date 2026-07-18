<script setup lang="ts">
import { ref, watch } from 'vue'

const search = ref('')

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

watch(search, (value) => {
  emit('search', value)
})
</script>

<template>
  <div class="search-bar">
    <input
      id="search"
      v-model="search"
      type="text"
      placeholder="Search by description or category..."
    />
  </div>
</template>

<style scoped>
.search-bar {
  width: 320px;
}

.search-bar input {
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.search-bar input:focus {
  outline: none;
  border-color: #2563eb;
}
</style>