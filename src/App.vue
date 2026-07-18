<script setup lang="ts">
import { computed, ref } from 'vue'
import ExpenseForm from './components/ExpenseForm.vue'
import ExpenseList from './components/ExpenseList.vue'
import { useExpenseStore } from './stores/expenses'
import TotalCard from './components/TotalCard.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import ConfirmModal from './modals/ConfirmModal.vue'
import Toast from './components/Toast.vue'
import SearchBar from './components/SearchBar.vue'
import SortExpenses from './components/SortExpenses.vue'
import StatsCards from './components/StatsCards.vue'
import ExpenseChart from './components/ExpenseChart.vue'
import type { Expense } from './types/expense'

const expenseStore = useExpenseStore()
const selectedExpense = ref<Expense | null>(null)
const selectedCategory = ref('All')
const showDeleteModal = ref(false)
const expenseToDelete = ref<Expense | null>(null)
const searchTerm = ref('')
const showToast = ref(false)
const selectedSort = ref('newest')
const toast = ref({
  message: '',
  type: 'success' as 'success' | 'info' | 'error',
})

const filteredExpenses = computed(() => {
  const expenses = expenseStore.expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory.value === 'All' ||
      expense.category === selectedCategory.value

    const matchesSearch =
      expense.description
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase()) ||
      expense.category
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase())

    return matchesCategory && matchesSearch
  })

  switch (selectedSort.value) {
    case 'highest':
      return [...expenses].sort((a, b) => b.amount - a.amount)

    case 'lowest':
      return [...expenses].sort((a, b) => a.amount - b.amount)

    case 'oldest':
      return [...expenses].sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )

    case 'az':
      return [...expenses].sort((a, b) =>
        a.description.localeCompare(b.description)
      )

    case 'za':
      return [...expenses].sort((a, b) =>
        b.description.localeCompare(a.description)
      )

    case 'newest':
    default:
      return [...expenses].sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
  }
})

const totalAmount = computed(() =>
  expenseStore.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  )
)

const highestExpense = computed(() => {
  if (!expenseStore.expenses.length) return 0

  return Math.max(
    ...expenseStore.expenses.map(
      expense => expense.amount
    )
  )
})

const averageExpense = computed(() => {
  if (!expenseStore.expenses.length) return 0

  return (
    totalAmount.value /
    expenseStore.expenses.length
  )
})

const totalRecords = computed(() =>
  expenseStore.expenses.length
)

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

function handleSearch(value: string) {
  searchTerm.value = value
}

function handleSort(option: string) {
  selectedSort.value = option
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

        <StatsCards
          :total-amount="totalAmount"
          :highest-expense="highestExpense"
          :average-expense="averageExpense"
          :total-expenses="totalRecords"
        />

        <ExpenseChart
          :expenses="filteredExpenses"
        />

      <div class="expenses-header">
        <h2>
          Expenses ({{ filteredExpenses.length }})
        </h2>

        <SearchBar
          @search="handleSearch"
        />

         <SortExpenses
          @sort="handleSort"
        />
      </div>

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
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

h1 {
  text-align: center;
  margin-bottom: 32px;
  color: #1f2937;
  font-size: clamp(2rem, 4vw, 2.8rem);
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

/* Header above the expense list */
.expenses-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.expenses-header h2 {
  margin: 0;
  color: #1f2937;
  font-size: 1.6rem;
  white-space: nowrap;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: flex-end;
}

/* Search Bar */
.expenses-header :deep(.search-bar) {
  flex: 1;
  max-width: 350px;
}

/* Sort Dropdown */
.expenses-header select {
  min-width: 160px;
}

/* Tablet */
@media (max-width: 1024px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .left-column,
  .right-column {
    width: 100%;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .app {
    padding: 16px;
  }

  h1 {
    margin-bottom: 24px;
  }

  .expenses-header {
    flex-direction: column;
    align-items: stretch;
  }

  .expenses-header h2 {
    text-align: center;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
    gap: 12px;
  }

  .expenses-header :deep(.search-bar),
  .expenses-header select {
    width: 100%;
    max-width: 100%;
  }
}

/* Small Phones */
@media (max-width: 480px) {
  .app {
    padding: 12px;
  }

  .dashboard {
    gap: 20px;
  }

  .left-column,
  .right-column {
    gap: 20px;
  }

  h1 {
    font-size: 2rem;
  }

  .expenses-header h2 {
    font-size: 1.4rem;
  }
}
</style>
