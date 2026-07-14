<script setup lang="ts">
import { computed, ref } from 'vue'
import ExpenseForm from './components/ExpenseForm.vue'
import ExpenseList from './components/ExpenseList.vue'
import { useExpenseStore } from './stores/expenses'
import TotalCard from './components/TotalCard.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import type { Expense } from './types/expense'

const expenseStore = useExpenseStore()
const selectedExpense = ref<Expense | null>(null)
const selectedCategory = ref('All')

const filteredExpenses = computed(() => {
  if (selectedCategory.value === 'All') {
    return expenseStore.expenses
  }

  return expenseStore.expenses.filter(
    expense => expense.category === selectedCategory.value
  )
})

function handleDelete(id: string) {
  expenseStore.deleteExpense(id)
}

function handleEdit(expense: Expense) {
  selectedExpense.value = expense
}

function handleFilter(category: string) {
  selectedCategory.value = category
}

function clearSelectedExpense() {
  selectedExpense.value = null
}
</script>

<template>
  <h1>Expense Tracker</h1>

  <TotalCard />

  <CategoryFilter @filter="handleFilter" />

  <ExpenseForm
  :selected-expense="selectedExpense"
  @clear-selected="clearSelectedExpense"
  />

  <ExpenseList
  :expenses="filteredExpenses"
  @delete="handleDelete"
  @edit="handleEdit"
  />
</template>