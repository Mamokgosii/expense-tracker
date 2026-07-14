<script setup lang="ts">
import { useExpenseStore } from '../stores/expenses'

const expenseStore = useExpenseStore()
</script>

<template>
  <div class="total-card">
    <h2>Total Expenses</h2>

    <p>
      R{{ expenseStore.totalExpenses.toFixed(2) }}
    </p>
  </div>
</template>