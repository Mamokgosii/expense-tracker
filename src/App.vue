<script setup lang="ts">
import { computed, ref } from 'vue'
import ExpenseForm from './components/ExpenseForm.vue'
import ExpenseList from './components/ExpenseList.vue'
import { useExpenseStore } from './stores/expenses'
import TotalCard from './components/TotalCard.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import ConfirmModal from './modals/ConfirmModal.vue'
import type { Expense } from './types/expense'

const expenseStore = useExpenseStore()
const selectedExpense = ref<Expense | null>(null)
const selectedCategory = ref('All')
const notification = ref('')
const showDeleteModal = ref(false)
const expenseToDelete = ref<Expense | null>(null)

const filteredExpenses = computed(() => {
  if (selectedCategory.value === 'All') {
    return expenseStore.expenses
  }

  return expenseStore.expenses.filter(
    expense => expense.category === selectedCategory.value
  )
})

function handleDelete(expense: Expense) {
  expenseToDelete.value = expense
  showDeleteModal.value = true
}

function confirmDelete() {
  if (!expenseToDelete.value) return

  expenseStore.deleteExpense(expenseToDelete.value.id)

  showNotification('Expense deleted successfully!')

  showDeleteModal.value = false
  expenseToDelete.value = null
}

function cancelDelete() {
  showDeleteModal.value = false
  expenseToDelete.value = null
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

function showNotification(message: string) {
  notification.value = message

  setTimeout(() => {
    notification.value = ''
  }, 3000)
}
</script>
<template>
  <div class="app">
    <h1>Expense Tracker</h1>

      <div
      v-if="notification"
      class="notification"
    >
      {{ notification }}
    </div>
    <div class="dashboard">

      <div class="left-column">
        <TotalCard />

        <CategoryFilter
          @filter="handleFilter"
        />

        <ExpenseForm
          :selected-expense="selectedExpense"
          @clear-selected="clearSelectedExpense"
          @saved="showNotification"
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
    <ConfirmModal
    :show="showDeleteModal"
    title="Delete Expense"
    :message="`Are you sure you want to delete '${expenseToDelete?.description}'? This action cannot be undone.`"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
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

.notification {
  background: #16a34a;
  color: white;
  padding: 14px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style>