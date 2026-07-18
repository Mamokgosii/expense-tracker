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
  background: white;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
}

.stat-card h3 {
  margin: 0 0 10px;
  color: #6b7280;
  font-size: .95rem;
}

.stat-card p {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2563eb;
}

@media (max-width:768px){
  .stats-grid{
    grid-template-columns:1fr;
  }
}
</style>