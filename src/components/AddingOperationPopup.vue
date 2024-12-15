<script setup>
import { useTransactionDataStore } from "@/stores/transactionDataStore.js";
const dataStore = useTransactionDataStore();
import {computed, ref} from "vue";

defineExpose({ open });

const today = new Date();

const amount = ref();
const category = ref();
const date = ref(today.toISOString().slice(0, 10));
const description = ref();

const currentDataObject = computed(() => {
  switch (dataStore.type){
    case 'expenses':
      return dataStore.expensesData;
    default:
      return dataStore.incomeData;
  }
})

async function addingOperation(){
  if(category.value === ''){
    close();
    return;
  }

  const id = new Date().toISOString().split('.')[0] + '-' + Math.round(Math.random() * (1000 - 9999) + 9999);

  const requestBody = {
    'id': id,
    'category': category.value,
    'description': description.value,
    'date': date.value,
    'amount': amount.value
  }

  await fetch(`http://localhost:3000/${dataStore.type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  currentDataObject.value.push(requestBody)

  category.value = description.value = amount.value = '';
  close();
}

function open() {
  document.getElementById('adding-operation-popup').showModal();
}
function handleModalClick({ currentTarget, target }) {
  const isClickedOnBackdrop = target === currentTarget;

  if (isClickedOnBackdrop) {
    close();
  }
}
function close() {
  document.getElementById('adding-operation-popup').close();
}
</script>

<template>
  <dialog class="popup" id="adding-operation-popup" @click="handleModalClick">
    <div class="popup-content">
      <h2 class="popup-title">
        Добавление операции
      </h2>
      <nav class="popup-menu">
        <ul class="popup-menu-list">
          <li :class="['popup-menu-item', {active: dataStore.type === 'expenses'}]">
            <a @click="dataStore.switchType('expenses')">Расходы</a>
          </li>
          <li :class="['popup-menu-item', {active: dataStore.type === 'income'}]">
            <a @click="dataStore.switchType('income')">Доходы</a>
          </li>
        </ul>
      </nav>
      <form class="popup-form">
        <input class="popup-input" type="number" v-model="amount" placeholder="Сумма" />
        <input class="popup-input" v-model="category" placeholder="Категория" />
        <input class="popup-input" type="date" v-model="date">
        <textarea class="popup-textarea" v-model="description" placeholder="Описание" rows="4"/>
      </form>
      <div class="buttons-container">
        <button class="popup-closing-button" @click="close">Отмена</button>
        <button class="popup-adding-operation-button" @click="addingOperation">Сохранить</button>
      </div>
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

.popup-menu {
  margin-top: 5px;
}

.popup-menu-list {
  display: flex;
  justify-content: space-around;
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

.popup-form {
  margin-top: 20px;
}

.popup-form > *:not(:first-child) {
  margin-top: 20px;
}

.popup-input {
  width: 100%;
  height: 32px;
  font-size: 16px;
  padding: 4px;
}

.popup-textarea {
  width: 100%;
  resize: none;
  font-size: 16px;
  padding: 4px;
}

.buttons-container {
  position: absolute;
  bottom: 32px;

  width: calc(100% - 64px);
  display: flex;
  justify-content: space-between;
}

.buttons-container > button {
  width: 112px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
}

.buttons-container > * {
  cursor: pointer;
}

.popup-closing-button {
  background-color: var(--color-button);
  color: var(--color-text-button);
}

.popup-adding-operation-button {
  background-color: #f10000;
  color: white;
}
</style>