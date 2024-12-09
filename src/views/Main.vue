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
  flex-grow: 1;
  display: flex;
}
.wrapper {
  width: 100%;
  padding: 12px 24px;
}
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 48px;
}
</style>