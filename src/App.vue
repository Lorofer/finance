<script setup>
import Header from "@/components/Header.vue";
import Main from "@/views/Main.vue";
</script>

<template>
  <Header/>

  <Main/>

  <footer>
    <div class="wrapper">
      <p>Developed by <a href="https://github.com/Lorofer">Lorofer</a></p>
    </div>
  </footer>
</template>

<style scoped>
footer{
  height: 80px;
  border-top: 1px solid var(--color-border);
}
@media (max-height: 768px) {
  footer{
    width: 100%;
    height: 60px;
  }
}
.wrapper{
  height: 100%;
  display: flex;
  align-items: center;
  white-space: pre;
}
</style>
