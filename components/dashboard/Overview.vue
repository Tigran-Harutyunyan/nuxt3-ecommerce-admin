<script setup lang="ts">
import { Bar } from "vue-chartjs";

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
interface OverviewProps {
  data: any[];
}

const props = defineProps<OverviewProps>();
const { data } = toRefs(props);

const chartData = ref({
  labels: data.value.map((item) => item.name),
  datasets: [
    {
      label: "Graph revenue",
      backgroundColor: "#f87979",
      data: data.value.map((item) => item.total),
    },
  ],
});
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
