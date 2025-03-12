<template>
  <canvas ref="canvasRef" style="height: 400px;"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Chart, PieController, ArcElement, Tooltip, Legend, Title, type ChartData } from 'chart.js'

Chart.register(PieController, ArcElement, Tooltip, Legend, Title)

const props = defineProps({
  chartData: {
    type: Object as () => ChartData<'pie', number[], unknown>,
    required: true,
  },
  chartOptions: {
    type: Object,
    default: () => ({}),
  },
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }
  if (canvasRef.value) {
    chartInstance = new Chart(canvasRef.value, {
      type: 'pie',
      data: props.chartData,
      options: props.chartOptions,
    })
  }
}

onMounted(() => {
  renderChart()
})

watch(
  () => props.chartData,
  () => {
    renderChart()
  },
  { deep: true }
)
</script>
