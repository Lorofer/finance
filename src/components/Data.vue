<script setup>
import CategoryPopUp from "@/components/CategoryPopup.vue";
import AddingOperationPopup from "@/components/AddingOperationPopup.vue";
import {computed, useTemplateRef} from "vue";

import { useDataStore } from "@/stores/dataStore.js";
const dataStore = useDataStore();

const categoryPopup = useTemplateRef('category-popup');
const addingOperationPopup = useTemplateRef('adding-operation-popup');
function openCategoryPopup(category){
  categoryPopup.value.open(category);
}
function openAddingPopup(){
  addingOperationPopup.value.open();
}

const currentType = computed(() => {
  switch (dataStore.type){
    case 'expenses':
      return 'Расходы';
    default:
      return 'Доходы';
  }
});
const currentAmount = computed(() => {
  switch (dataStore.type){
    case 'expenses':
      return dataStore.amountOfExpenses;
    default:
      return dataStore.amountOfIncome;
  }
});
const currentList = computed(() => {
  switch (dataStore.type){
    case 'expenses':
      return dataStore.amountsOfExpensesByCategory;
    default:
      return dataStore.amountsOfIncomeByCategory;
  }
});

//console.log(currentList.value)
</script>

<template>
<CategoryPopUp ref="category-popup"/>
<AddingOperationPopup ref="adding-operation-popup"/>

<div class="data-container">
  <h2 class="title">
    {{currentType}} <span class="amount">{{currentAmount}}</span>
  </h2>
  <ul class="amounts-list">
    <li
        class="amount-item"
        v-for="(amount, category) in currentList"
        @click="openCategoryPopup(category)"
    >
      {{category}}: <span class="amount">{{amount}}</span>
    </li>
  </ul>
  <button @click="openAddingPopup">Добавить операцию</button>
</div>
</template>

<style scoped>
.data-container {
  padding-left: 12px;
  width: 50%;
  max-width: 290px;
  position: relative;
}
.data-container > *:not(:first-child){
  margin-top: 24px;
}

.title{
  padding-left: 6px;
  position: relative;
}

.amount-item{
  position: relative;
  padding: 6px;
  transition: 0.4s;
}
.amount-item:not(:first-child){
  border-top: 1px solid var(--color-border);
}
.amount-item:hover{
  cursor: pointer;
  background-color: var(--hover-grey);
}
.amount{
  position: absolute;
  right: 6px;
}

button{
  width: calc(100% - 12px);
  height: 40px;
  font-size: 18px;
  cursor: pointer;

  position: absolute;
  bottom: 0;

  border: 0;
  border-radius: 16px;
  background-color: var(--color-button);
  color: var(--color-text-button);
}
</style>