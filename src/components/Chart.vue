<script setup>
import {computed} from "vue";

import 'chart.js/auto';
import { Doughnut } from 'vue-chartjs';

import { useDataStore } from "@/stores/dataStore.js";
const dataStore = useDataStore();

const chartData = computed(() => {
  switch (dataStore.type){
    case 'expenses':
      return dataStore.expensesChartData;
    default:
      return dataStore.incomeChartData
  }
})
const options = {
  responsive: true,
  plugins: {
    colors: {
      forceOverride: true
    }
  }
};
</script>

<template>
  <div class="chart-container">
    <Doughnut
        :data="chartData"
        :options="options"
    />
  </div>
</template>

<style scoped>
.chart-container{
  width: 50%;
}
</style>