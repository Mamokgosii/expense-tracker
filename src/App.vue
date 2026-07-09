<script setup lang="ts">
import ExpenseList from './components/ExpenseList.vue'
import { useExpenseStore } from './stores/expenses'

const expenseStore = useExpenseStore()
</script>

<template>
  <h1>Expense Tracker</h1>

  <ExpenseList :expenses="expenseStore.expenses" />
</template>