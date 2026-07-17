<script setup lang="ts">
import type { Expense } from '../types/expense'

const props = defineProps<{
  expense: Expense
}>()

const emit = defineEmits<{
  (e: 'edit', expense: Expense): void
  (e: 'delete', id: string): void
}>()

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}
</script>

<template>
  <div class="expense-item">
    <div class="expense-header">
      <h3>{{ props.expense.description }}</h3>

      <span class="amount">
        R{{ props.expense.amount.toFixed(2) }}
      </span>
    </div>

    <div class="expense-details">
      <span class="category">
        {{ props.expense.category }}
      </span>

      <span class="expense-date">
        {{ formatDate(props.expense.date) }}
      </span>
    </div>

    <div class="expense-actions">
      <button
        class="edit-btn"
        @click="emit('edit', props.expense)"
      >
        Edit
      </button>

      <button
        class="delete-btn"
        @click="emit('delete', props.expense.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.expense-item {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}

.expense-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.expense-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.expense-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #1f2937;
}

.amount {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2563eb;
}

.expense-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  font-size: 0.9rem;
}

.category {
  background: #eff6ff;
  color: #2563eb;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;
}

.expense-date {
  color: #6b7280;
}

.expense-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.expense-actions button {
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.edit-btn {
  background: #10b981;
  color: white;
}

.edit-btn:hover {
  background: #059669;
}

.delete-btn {
  background: #ef4444;
  color: white;
}

.delete-btn:hover {
  background: #dc2626;
}
</style>