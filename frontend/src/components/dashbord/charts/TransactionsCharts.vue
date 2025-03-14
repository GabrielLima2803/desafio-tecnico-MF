<template>
  <v-fade-transition>
    <h1 class="text-h4 my-4">Transações Gráficos</h1>
  </v-fade-transition>

  <div class="charts-container" v-if="transactionStore.transactions.length">
    <div class="chart-wrapper">
      <PieChart :chartData="pieChartData" :chartOptions="pieChartOptions" />
    </div>

    <div class="chart-wrapper">
      <LineChart :chartData="lineChartData" :chartOptions="lineChartOptions" />
    </div>
  </div>
  <div v-else class="wrapper-empty">
    <h1 class="text-empty">Sem trasações, vá e cadastre uma transação...</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransactionStore } from '../../../stores/transaction'
import { getMonthName } from '../../../helpers/getMonthName'
import PieChart from './type/PieChart.vue'
import LineChart from './type/LineChart.vue'

const transactionStore = useTransactionStore()

const totalEntrada = computed(() =>
  transactionStore.transactions.reduce((acc, transaction) => {
    return transaction.type === 'entrada'
      ? acc + Number(transaction.value)
      : acc
  }, 0)
)

const totalSaida = computed(() =>
  transactionStore.transactions.reduce((acc, transaction) => {
    return transaction.type === 'saida'
      ? acc + Number(transaction.value)
      : acc
  }, 0)
)

const pieChartData = computed(() => ({
  labels: ['Entrada', 'Saída'],
  datasets: [
    {
      label: 'Valores',
      backgroundColor: ['#4caf50', '#f44336'],
      data: [totalEntrada.value, totalSaida.value],
    },
  ],
}))

const pieChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Comparativo: Entrada x Saída',
    },
  },
})

const monthlyData = computed(() => {
  const result: Record<string, { entrada: number; saida: number }> = {}

  transactionStore.transactions.forEach(transaction => {
    const month = getMonthName(transaction.created_at)
    if (!result[month]) {
      result[month] = { entrada: 0, saida: 0 }
    }
    if (transaction.type === 'entrada') {
      result[month].entrada += Number(transaction.value)
    } else if (transaction.type === 'saida') {
      result[month].saida += Number(transaction.value)
    }
  })

  const monthOrder = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  const sortedMonths = monthOrder.filter(month => result[month] !== undefined)

  return {
    labels: sortedMonths,
    dataEntrada: sortedMonths.map(month => result[month].entrada),
    dataSaida: sortedMonths.map(month => result[month].saida)
  }
})

const lineChartData = computed(() => ({
  labels: monthlyData.value.labels,
  datasets: [
    {
      label: 'Entrada',
      backgroundColor: '#4caf50',
      borderColor: '#4caf50',
      fill: false,
      data: monthlyData.value.dataEntrada,
      tension: 0.1,
    },
    {
      label: 'Saída',
      backgroundColor: '#f44336',
      borderColor: '#f44336',
      fill: false,
      data: monthlyData.value.dataSaida,
      tension: 0.1,
    },
  ],
}))

const lineChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Transações por Mês',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Mês',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Valor',
      },
    },
  },
})
</script>


<style scoped>
.charts-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 1rem;
  border-radius: 8px;
}

.chart-wrapper {
  flex: 1;
  min-width: 400px;
  height: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.text-length{
  height: 100vh;
  text-align: center;
}
.wrapper-empty{
  display: flex;
  margin-top: 200px;
  justify-content: center;
  align-items: center;
}
@media (max-width: 960px) {
  .charts-container {
    flex-direction: column;
  }

  .chart-wrapper {
    min-width: 100%;
  }
}
</style>