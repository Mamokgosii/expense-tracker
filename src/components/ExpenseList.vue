<script setup lang="ts">
import ExpenseItem from './ExpenseItem.vue'
import type { Expense } from '../types/expense'

defineProps<{
  expenses: Expense[]
}>()

const emit = defineEmits<{
  (e: 'edit', expense: Expense): void
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <ExpenseItem
    v-for="expense in expenses"
    :key="expense.id"
    :expense="expense"
    @edit="emit('edit', $event)"
    @delete="emit('delete', $event)"
  />
</template>