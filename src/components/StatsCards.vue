<script setup lang="ts">
const props = defineProps<{
  totalAmount: number
  highestExpense: number
  averageExpense: number
  totalExpenses: number
}>()

function formatCurrency(value: number) {
  return `R${value.toFixed(2)}`
}
</script>

<template>
  <div class="stats-grid">

    <div class="stat-card">
      <h3>Highest Expense</h3>
      <p>{{ formatCurrency(highestExpense) }}</p>
    </div>

    <div class="stat-card">
      <h3>Average Expense</h3>
      <p>{{ formatCurrency(averageExpense) }}</p>
    </div>

    <div class="stat-card">
      <h3>Total Records</h3>
      <p>{{ totalExpenses }}</p>
    </div>

  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
  transition: all .2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,.08);
}

.stat-card h3 {
  margin: 0 0 10px;
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 600;
}

.stat-card p {
  margin: 0;
  color: #2563eb;
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  font-weight: 700;
  word-break: break-word;
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 18px;
  }

  .stat-card h3 {
    font-size: 0.9rem;
  }

  .stat-card p {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .stat-card {
    padding: 16px;
    border-radius: 12px;
  }

  .stat-card h3 {
    font-size: 0.85rem;
  }

  .stat-card p {
    font-size: 1.6rem;
  }
}
</style>