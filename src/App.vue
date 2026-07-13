<script setup lang="ts">
import { ref } from 'vue'
import ExpenseForm from './components/ExpenseForm.vue'
import ExpenseList from './components/ExpenseList.vue'
import { useExpenseStore } from './stores/expenses'
import type { Expense } from './types/expense'

const expenseStore = useExpenseStore()
const selectedExpense = ref<Expense | null>(null)

function handleDelete(id: string) {
  expenseStore.deleteExpense(id)
}

function handleEdit(expense: Expense) {
  selectedExpense.value = expense
}
</script>

<template>
  <h1>Expense Tracker</h1>
  <ExpenseForm
  :selected-expense="selectedExpense"
  />
  <ExpenseList
  :expenses="expenseStore.expenses"
  @delete="handleDelete"
  @edit="handleEdit"
/>
</template>