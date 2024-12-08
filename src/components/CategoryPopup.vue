<script setup>
import {computed, ref} from "vue";

import { useTransactionDataStore } from "@/stores/transactionDataStore.js";
import { useDateStore } from "@/stores/dateStore.js";
const transactionDataStore = useTransactionDataStore();
const dateStore = useDateStore();

const isOpen = ref(false);
defineExpose({
  open,
})

let title = ref('');
let operations = computed(() => {
  switch (transactionDataStore.type){
    case 'expenses':
      return transactionDataStore.expensesByCategory[title.value];
    default:
      return transactionDataStore.incomeByCategory[title.value];
  }
})
const currentAmount = computed(() => {
  switch (transactionDataStore.type){
    case 'expenses':
      return transactionDataStore.amountsOfExpensesByCategory[title.value];
    default:
      return transactionDataStore.amountsOfIncomeByCategory[title.value];
  }
});

function open(category){
  title.value = category;
  isOpen.value = true;
}
function close(){
  isOpen.value = false;
}
</script>

<template>
<div class="backdrop" v-if="isOpen" @click="close"></div>
<div class="popup" v-if="isOpen">
  <nav class="popup-menu">
    <ul class="popup-menu-list">
      <li :class="['popup-menu-item', {active: transactionDataStore.period === 'week'}]">
        <a @click="transactionDataStore.switchPeriod('week')">За неделю</a>
      </li>
      <li :class="['popup-menu-item', {active: transactionDataStore.period === 'month'}]">
        <a @click="transactionDataStore.switchPeriod('month')">За месяц</a>
      </li>
      <li :class="['popup-menu-item', {active: transactionDataStore.period === 'year'}]">
        <a @click="transactionDataStore.switchPeriod('year')">За год</a>
      </li>
    </ul>
  </nav>

  <h2 class="popup-title">
    {{ title }}: <span class="amount">{{currentAmount}}</span>
  </h2>

  <ul class="popup-list">
    <li class="popup-list-item" v-for="operation in operations">
      <p class="popup-list-item-data">{{dateStore.dateConversion(operation.date)}}</p>
      <p class="popup-list-item-amount">{{operation.amount}}</p>
      <p class="popup-list-item-description">{{operation.description}}</p>
    </li>
  </ul>

  <button class="popup-closing-button" @click="close">Закрыть</button>
</div>
</template>

<style scoped>
.backdrop{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(100, 100, 100, 0.25);
}
.popup{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  width: 400px;
  height: 500px;
  background-color: white;
  padding: 32px;
  border-radius: 24px;
}
.popup > *:not(:first-child){
  margin-top: 24px;
}

.popup-menu-list{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.popup-menu-item{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 0 2px;
}
.popup-menu-item.active::after {
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

.popup-title{
  position: relative;
}
.amount{
  position: absolute;
  right: 0;
}

.popup-list-item{
  padding: 4px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  transition: 0.4s;
}
.popup-list-item:hover{
  background-color: var(--hover-grey);
}
.popup-list-item:not(:first-child){
  border-top: 1px solid var(--color-border);
}
.popup-list-item-amount{
  text-align: right;
}
.popup-list-item-description{
  grid-column: 1 / 3;
}

.popup-closing-button{
  position: absolute;
  bottom: 32px;
  right: 32px;

  width: 128px;
  height: 32px;
  background-color: var(--color-button);
  border: 0;
  border-radius: 8px;
  color: var(--color-text-button);
  font-size: 16px;

  cursor: pointer;
}
</style>