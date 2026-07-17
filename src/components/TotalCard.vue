<script setup lang="ts">
import { useExpenseStore } from '../stores/expenses'

const expenseStore = useExpenseStore()
</script>

<template>
  <div class="total-card">
    <h2>Total Expenses</h2>

    <p class="total-amount">
      R{{ expenseStore.totalExpenses.toFixed(2) }}
    </p>

    <p class="subtitle">
      Keep track of your spending
    </p>
  </div>
</template>
<style scoped>
.total-card {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 1.8rem;
}

.card-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.total-amount {
  margin: 24px 0 8px;
  font-size: 2.4rem;
  font-weight: 700;
}

.subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 0.95rem;
}
</style>