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
  <!-- <ResponsiveContainer width="100%" height="{350}">
    <BarChart data="{data}">
      <XAxis
        dataKey="name"
        stroke="#888888"
        fontSize="{12}"
        tickLine="{false}"
        axisLine="{false}"
      />
      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}
      tickFormatter={(value) => `$${value}`} />
      <Bar dataKey="total" fill="#3498db" radius="{[4," 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer> -->
</template>
