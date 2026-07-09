<script setup lang="ts">
import type { Expense } from '../types/expense'

defineProps<{
  expense: Expense
}>()
</script>

<template>
  <div class="expense-item">
    <h3>{{ expense.description }}</h3>
    <p>{{ expense.category }}</p>
    <p>{{ expense.date }}</p>
    <p>R{{ expense.amount }}</p>
  </div>
</template>
