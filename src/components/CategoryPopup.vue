<script setup>
import {computed, ref} from "vue";

import { useTransactionDataStore } from "@/stores/transactionDataStore.js";
import { useDateStore } from "@/stores/dateStore.js";
const transactionDataStore = useTransactionDataStore();
const dateStore = useDateStore();

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
  document.getElementById('category-popup').showModal();
  title.value = category;
}
defineExpose({ open });
function handleModalClick({ currentTarget, target }) {
  const isClickedOnBackdrop = target === currentTarget;

  if (isClickedOnBackdrop) {
    close();
  }
}
function close(){
  document.getElementById('category-popup').close();
}

function foo(obj){
  alert(obj.description);
}
</script>

<template>
<dialog class="popup" id="category-popup" @click="handleModalClick">
  <div class="popup-content">
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
      <li class="popup-list-item"
          v-for="operation in operations"
          @click="foo(operation)"
      >
        <p class="popup-list-item-data">{{dateStore.dateConversion(operation.date)}}</p>
        <p class="popup-list-item-amount">{{operation.amount}}</p>
        <p class="popup-list-item-description">{{operation.description}}</p>
      </li>
    </ul>

    <button class="popup-closing-button" @click="close">Закрыть</button>
  </div>
</dialog>
</template>

<style scoped>
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: 24px;
  border: 0;
}

.popup-content {
  padding: 32px;
  width: 100%;
  height: 100%;
}

.popup-content > *:not(:first-child) {
  margin-top: 24px;
}

.popup-menu-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-menu-item {
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

.popup-title {
  position: relative;
}

.amount {
  position: absolute;
  right: 0;
}

.popup-list-item {
  padding: 4px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  transition: 0.4s;
}

.popup-list-item:hover {
  background-color: var(--hover-grey);
}

.popup-list-item:not(:first-child) {
  border-top: 1px solid var(--color-border);
}

.popup-list-item-amount {
  text-align: right;
}

.popup-list-item-description {
  grid-column: 1 / 3;
}

.popup-closing-button {
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