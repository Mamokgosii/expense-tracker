<script setup lang="ts">
import { computed, ref } from 'vue'
import ExpenseForm from './components/ExpenseForm.vue'
import ExpenseList from './components/ExpenseList.vue'
import { useExpenseStore } from './stores/expenses'
import TotalCard from './components/TotalCard.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import ConfirmModal from './modals/ConfirmModal.vue'
import Toast from './components/Toast.vue'
import type { Expense } from './types/expense'

const expenseStore = useExpenseStore()
const selectedExpense = ref<Expense | null>(null)
const selectedCategory = ref('All')
const showDeleteModal = ref(false)
const expenseToDelete = ref<Expense | null>(null)
const showToast = ref(false)
const toast = ref({
  message: '',
  type: 'success' as 'success' | 'info' | 'error',
})

const filteredExpenses = computed(() => {
  if (selectedCategory.value === 'All') {
    return expenseStore.expenses
  }

  return expenseStore.expenses.filter(
    expense => expense.category === selectedCategory.value
  )
})

function showNotification(
  message: string,
  type: 'success' | 'info' | 'error'
) {
  toast.value.message = message
  toast.value.type = type
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

function handleDelete(expense: Expense) {
  expenseToDelete.value = expense
  showDeleteModal.value = true
}

function confirmDelete() {
  if (!expenseToDelete.value) return

  expenseStore.deleteExpense(expenseToDelete.value.id)
  showNotification('Expense deleted successfully!', 'error')
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

</script>
<template>
  <div class="app">
    <h1>Expense Tracker</h1>
     <Toast
      :show="showToast"
      :message="toast.message"
      :type="toast.type"
    />
    <div class="dashboard">

      <div class="left-column">
        <TotalCard />

        <CategoryFilter
          @filter="handleFilter"
        />

        <ExpenseForm
          :selected-expense="selectedExpense"
          @clear-selected="clearSelectedExpense"
          @saved="(message, type) => showNotification(message, type)"
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