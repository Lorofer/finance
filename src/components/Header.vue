<script setup>
import {useTransactionDataStore} from "@/stores/transactionDataStore.js";
const dataStore = useTransactionDataStore();
</script>

<template>
  <header>
    <div class="header-block upper-header-block">
      <div class="wrapper">
        <nav class="header-menu">
          <ul class="header-menu-list">
            <li :class="['header-menu-item', {active: dataStore.type === 'expenses'}]">
              <a @click="dataStore.switchType('expenses')">Расходы</a>
            </li>
            <li :class="['header-menu-item', {active: dataStore.type === 'income'}]">
              <a @click="dataStore.switchType('income')">Доходы</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="header-block lower-header-block">
      <nav class="header-menu">
        <ul class="header-menu-list">
          <li :class="['header-menu-item', {active: dataStore.period === 'week'}]">
            <a @click="dataStore.switchPeriod('week')">За неделю</a>
          </li>
          <li :class="['header-menu-item', {active: dataStore.period === 'month'}]">
            <a @click="dataStore.switchPeriod('month')">За месяц</a>
          </li>
          <li :class="['header-menu-item', {active: dataStore.period === 'year'}]">
            <a @click="dataStore.switchPeriod('year')">За год</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header-block{
  border-bottom: 1px solid var(--color-border);
}
.upper-header-block{
  height: 80px;
}
@media (max-height: 768px) {
  .upper-header-block {
    height: 60px;
  }
}
.lower-header-block{
  height: 35px;
}
.wrapper{
  height: 100%;
}

.header-menu {
  height: 100%;
  font-size: 1rem;
  box-sizing: content-box;
}
.header-menu-list {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-menu-item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}
.header-menu-item.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background-color: var(--vt-c-indigo);
}
a {
  display: inline-block;
  margin: auto;
  text-decoration: none;
  color: var(--color-text);
  cursor: pointer;
}
.upper-header-block a {
  padding: 0 2.5rem;
  border-left: 1px solid var(--color-border);
}
.lower-header-block .header-menu-item {
  margin: 0 1.5rem;
  padding: 0 4px;
}
.header-menu-item:first-child a{
  border: 0;
}
</style>