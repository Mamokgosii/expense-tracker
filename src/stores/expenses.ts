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

  function addExpense(expense: Expense) {
    expenses.value.push(expense)
  }
 
  function deleteExpense(id: string) {
    expenses.value = expenses.value.filter(
      expense => expense.id !== id
    )
  }

  function updateExpense(updatedExpense: Expense) {
    const index = expenses.value.findIndex(
      expense => expense.id === updatedExpense.id
    )

    if (index !== -1) {
      expenses.value[index] = updatedExpense
    }
 }

  return {
    expenses,
    totalExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
  }

})