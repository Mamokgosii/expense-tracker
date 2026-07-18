<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import type { Expense } from '../types/expense'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const props = defineProps<{
  expenses: Expense[]
}>()

const chartData = computed(() => {
  const totals: Record<string, number> = {}

  props.expenses.forEach((expense) => {
    totals[expense.category] =
      (totals[expense.category] || 0) + expense.amount
  })

  return {
    labels: Object.keys(totals),
    datasets: [
      {
        data: Object.values(totals),
        backgroundColor: [
          '#2563eb',
          '#16a34a',
          '#f59e0b',
          '#dc2626',
          '#8b5cf6',
        ],
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
}
</script>

<template>
  <div class="chart-card">
     <div class="chart-header">
      <h2>Spending by Category</h2>
      <p>See how your expenses are distributed across categories.</p>
    </div>

    <div class="chart-container">
    <div
        v-if="expenses.length === 0"
        class="empty-chart"
        >
        No expense data available yet.
    </div>
    <Pie
      :data="chartData"
      :options="chartOptions"
    />
    </div>
  </div>
</template>

<style scoped>
.chart-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
}

.chart-header {
  margin-bottom: 20px;
}

.chart-header h2 {
  margin-bottom: 6px;
}

.chart-header p {
  color: #6b7280;
}

.chart-container {
  position: relative;
  height: 320px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-container.empty {
  height: 180px;
}

.empty-chart {
  color: #6b7280;
  font-size: 1rem;
  text-align: center;
}
</style>