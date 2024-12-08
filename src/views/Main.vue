<script setup>
import Chart from "@/components/Chart.vue";
import Data from "@/components/Data.vue";
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="main-container">
        <Chart />
        <Data />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - 195px);
  display: flex;
}
.wrapper {
  width: 100%;
}
.main-container {
  width: 100%;
  display: flex;
  gap: 48px;
}
</style>