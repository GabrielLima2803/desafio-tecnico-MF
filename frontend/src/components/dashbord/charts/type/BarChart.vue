<template>
  <canvas ref="canvasRef" style="height: 400px;"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Chart, type ChartData } from 'chart.js'

const props = defineProps({
  chartData: {
    type: Object as () => ChartData<'bar', number[], unknown>,
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
      type: 'bar',
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
