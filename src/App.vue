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
  <div class="app">
    <h1>Expense Tracker</h1>

    <div class="dashboard">

      <div class="left-column">
        <TotalCard />

        <CategoryFilter
          @filter="handleFilter"
        />

        <ExpenseForm
          :selected-expense="selectedExpense"
          @clear-selected="clearSelectedExpense"
        />
      </div>

      <div class="right-column">
        <ExpenseList
          :expenses="filteredExpenses"
          @delete="handleDelete"
          @edit="handleEdit"
        />
      </div>

    </div>
  </div>
</template>
<style scoped>
.app {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 32px;
  color: #1f2937;
  font-size: 2.5rem;
}

.dashboard {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 24px;
  align-items: start;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 900px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style>