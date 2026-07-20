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
  width: 100%;
  max-width: 320px;
}

.search-bar input {
  width: 100%;
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 0.95rem;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.search-bar input::placeholder {
  color: #9ca3af;
}

.search-bar input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

@media (max-width: 768px) {
  .search-bar {
    max-width: 100%;
  }

  .search-bar input {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .search-bar input {
    min-height: 42px;
    padding: 0 12px;
    font-size: 0.95rem;
  }
}
</style>