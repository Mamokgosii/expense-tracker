<script setup lang="ts">
import type { Expense } from '../types/expense'

const props = defineProps<{
  expense: Expense
}>()

const emit = defineEmits<{
  (e: 'edit', expense: Expense): void
  (e: 'delete', id: string): void
}>()

</script>

<template>
  <div class="expense-item">
    <h3>{{ props.expense.description }}</h3>
    <p>{{ props.expense.category }}</p>
    <p>{{ props.expense.date }}</p>
    <p>R{{ props.expense.amount }}</p>

     <div class="expense-actions">
      <button @click="emit('edit', props.expense)">
        Edit
      </button>

      <button @click="emit('delete', props.expense.id)">
        Delete
      </button>
    </div>
  </div>
</template>
