<script setup lang="ts">
import ExpenseItem from './ExpenseItem.vue'
import type { Expense } from '../types/expense'

defineProps<{
  expenses: Expense[]
}>()
</script>

<template>
  <ExpenseItem
    v-for="expense in expenses"
    :key="expense.id"
    :expense="expense"
  />
</template>