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
   <div class="expense-list">
    <h2>Expenses</h2>
    <p
      v-if="expenses.length === 0"
      class="empty-state"
    >
      No expenses added yet. Add your first expense above!
    </p>

    <ExpenseItem
      v-else
      v-for="expense in expenses"
      :key="expense.id"
      :expense="expense"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
    />
  </div>
</template>
<style scoped>
.expense-list {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0,0,0,.08);
}

.expense-list h2 {
  margin-bottom: 20px;
  color: #1f2937;
}

.empty-state {
  text-align: center;
  color: #6b7280;
  padding: 40px 0;
}
</style>