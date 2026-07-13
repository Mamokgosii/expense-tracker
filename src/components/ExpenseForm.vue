<script setup lang="ts">
import { ref } from 'vue'
import { useExpenseStore } from '../stores/expenses'
import type { Expense } from '../types/expense'

const description = ref('')
const amount = ref<number | null>(null)
const category = ref('')
const date = ref('')

const expenseStore = useExpenseStore()
const props = defineProps<{
  selectedExpense: Expense | null
}>()

const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Shopping',
]

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

  expenseStore.addExpense({
    id: crypto.randomUUID(),
    description: description.value,
    amount: amount.value,
    category: category.value,
    date: date.value,
  })

  description.value = ''
  amount.value = null
  category.value = ''
  date.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="description">Description</label>
      <input
        id="description"
        v-model="description"
        type="text"
        placeholder="Enter description"
      />
    </div>

    <div>
      <label for="amount">Amount</label>
      <input
        id="amount"
        v-model="amount"
        type="number"
        placeholder="Enter amount"
      />
    </div>

    <div>
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

    <div>
      <label for="date">Date</label>
      <input
        id="date"
        v-model="date"
        type="date"
      />
    </div>

    <button type="submit">
      Add Expense
    </button>
  </form>
</template>