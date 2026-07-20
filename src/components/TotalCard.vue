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
  width: 100%;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.card-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.total-amount {
  margin: 24px 0 8px;
  font-size: clamp(2rem, 5vw, 2.6rem);
  font-weight: 700;
  word-break: break-word;
}

.subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .total-card {
    padding: 20px;
  }

  .card-header h2 {
    font-size: 1.1rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .total-card {
    padding: 16px;
    border-radius: 12px;
  }

  .card-header {
    gap: 8px;
  }

  .icon {
    font-size: 1.5rem;
  }

  .card-header h2 {
    font-size: 1rem;
  }

  .total-amount {
    margin: 18px 0 6px;
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 0.85rem;
  }
}
</style>