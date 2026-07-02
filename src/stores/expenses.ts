import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Expense } from '../types/expense'

export const useExpenseStore = defineStore('expenses', () => {
  const expenses = ref<Expense[]>([])

  const totalExpenses = computed(() =>
    expenses.value.reduce(
      (total, expense) => total + expense.amount,
      0
    )
  )

  return {
    expenses,
    totalExpenses,
  }
})