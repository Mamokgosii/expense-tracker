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
    <h3>No expense data</h3>
    <p>Add an expense to see your spending by category.</p>
  </div>

  <Pie
    v-else
    :data="chartData"
    :options="chartOptions"
  />
</div>
  </div>
</template>

<style scoped>
.chart-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
  width: 100%;
  box-sizing: border-box;
}

.chart-header {
  margin-bottom: 20px;
}

.chart-header h2 {
  margin: 0 0 6px;
  color: #1f2937;
  font-size: 1.4rem;
}

.chart-header p {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 260px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-container canvas {
  max-width: 100%;
  max-height: 100%;
}

.chart-container.empty {
  height: 180px;
}

.empty-chart {
  color: #6b7280;
  font-size: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .chart-card {
    padding: 20px;
  }

  .chart-header h2 {
    font-size: 1.25rem;
  }

  .chart-container {
    height: 220px;
  }

  .chart-container.empty {
    height: 160px;
  }
}

@media (max-width: 480px) {
  .chart-card {
    padding: 16px;
    border-radius: 12px;
  }

  .chart-header h2 {
    font-size: 1.1rem;
  }

  .chart-header p {
    font-size: 0.9rem;
  }

  .chart-container {
    height: 200px;
  }

  .chart-container.empty {
    height: 140px;
  }

  .empty-chart {
    font-size: 0.9rem;
  }
}
</style>