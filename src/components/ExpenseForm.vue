<script setup lang="ts">
import { ref, watch } from 'vue'
import { useExpenseStore } from '../stores/expenses'
import type { Expense } from '../types/expense'

const props = defineProps<{
  selectedExpense: Expense | null
}>()

const emit = defineEmits<{
  (e: 'clear-selected'): void
}>()

const expenseStore = useExpenseStore()

const description = ref('')
const amount = ref<number | null>(null)
const category = ref('')
const date = ref('')

const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Shopping',
]

watch(
  () => props.selectedExpense,
  (expense) => {
    if (!expense) {
      return
    }

    description.value = expense.description
    amount.value = expense.amount
    category.value = expense.category
    date.value = expense.date
  }
)

function resetForm() {
  description.value = ''
  amount.value = null
  category.value = ''
  date.value = ''
}

function handleSubmit() {
  if (
    !description.value ||
    amount.value === null ||
    !category.value ||
    !date.value
  ) {
    alert('Please fill in all fields.')
    return
  }

  const expense: Expense = {
    id: props.selectedExpense?.id ?? crypto.randomUUID(),
    description: description.value,
    amount: amount.value,
    category: category.value,
    date: date.value,
  }

  if (props.selectedExpense) {
    expenseStore.updateExpense(expense)
    emit('clear-selected')
    } else {
      expenseStore.addExpense(expense)
  }

  resetForm()
}
</script>
<template>
  <form
    class="expense-form"
    @submit.prevent="handleSubmit"
  >
    <h2>
      {{ props.selectedExpense ? 'Edit Expense' : 'Add Expense' }}
    </h2>

    <div class="form-group">
      <label for="description">Description</label>
      <input
        id="description"
        v-model="description"
        type="text"
        placeholder="e.g. Groceries"
      />
    </div>

    <div class="form-group">
      <label for="amount">Amount</label>
      <input
        id="amount"
        v-model="amount"
        type="number"
        placeholder="e.g. 350"
      />
    </div>

    <div class="form-group">
      <label for="category">Category</label>

      <select
        id="category"
        v-model="category"
      >
        <option value="">Select Category</option>

        <option
          v-for="categoryOption in categories"
          :key="categoryOption"
          :value="categoryOption"
        >
          {{ categoryOption }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="date">Date</label>

      <input
        id="date"
        v-model="date"
        type="date"
      />
    </div>

    <button type="submit">
      {{ props.selectedExpense ? 'Update Expense' : 'Add Expense' }}
    </button>
  </form>
</template>
<style scoped>
.expense-form {
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
  transition: all 0.2s ease;
}

.expense-form:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,.08);
}

.expense-form h2 {
  margin-bottom: 24px;
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 700;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-weight: 600;
}

input,
select {
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #f9fafb;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

input::placeholder {
  color: #9ca3af;
}

input:focus,
select:focus {
  outline: none;
  border-color: #2563eb;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

button {
  width: 100%;
  padding: 14px;
  margin-top: 12px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease,
              transform 0.2s ease;
}

button:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .expense-form {
    padding: 20px;
  }

  .expense-form h2 {
    font-size: 1.3rem;
  }

  input,
  select,
  button {
    font-size: 0.95rem;
  }
}
</style>