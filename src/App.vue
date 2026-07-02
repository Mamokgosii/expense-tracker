<script setup lang="ts">
import ExpenseForm from './components/ExpenseForm.vue'
import ExpenseList from './components/ExpenseList.vue'
import TotalCard from './components/TotalCard.vue'
</script>

<template>
  <h1>Expense Tracker</h1>

  <TotalCard />
  <ExpenseForm />
  <ExpenseList />
</template>