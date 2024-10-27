import {computed, ref} from 'vue';
import {defineStore} from 'pinia';

export const useDataStore = defineStore('dataStore', () => {
  const expensesData = ref([]);
  const incomeData = ref([]);

  function switchType(selectedType){
    switch (selectedType){
      case 'expenses':
        type.value = 'expenses';
        break;
      default:
        type.value = 'income';
    }
  }
  const type = ref('expenses');

  function complianceWithThePeriod(date){
    const d = new Date();
    switch (period.value) {
      case 'week':
        d.setDate(d.getDate() - 7);
        return new Date(date) > d;
      case 'month':
        d.setMonth(d.getMonth() - 1);
        return new Date(date) > d;
      default:
        d.setFullYear(d.getFullYear() - 7);
        return true;
    }
  }
  function switchPeriod(selectedPeriod){
    switch (selectedPeriod){
      case 'week':
        period.value = 'week';
        break;
      case 'month':
        period.value = 'month';
        break;
      default:
        period.value = 'year';
    }
  }
  const period = ref('week');

  function getAmount(dataObj){
    let totalAmount = 0;
    dataObj.value.forEach(row => {
      if(complianceWithThePeriod(row.date)){
        totalAmount += +row.amount;
      }
    });
    return totalAmount;
  }
  const amountOfExpenses = computed(() => getAmount(expensesData));
  const amountOfIncome = computed(() => getAmount(incomeData));

  function getOperationsByCategory(dataObj){
    let result = {};
    dataObj.value.forEach(row => {
      if(complianceWithThePeriod(row.date)){
        if(!result[`${row.category}`]){
          result[`${row.category}`] = [];
        }
        result[`${row.category}`].push(row);
      }
    })
    return result;
  }
  const expensesByCategory = computed(() => getOperationsByCategory(expensesData));
  const incomeByCategory = computed(() => getOperationsByCategory(incomeData));

  function getAmountsByCategory(operations){
    let result = {};
    for(let categoryArray in operations.value){
      operations.value[categoryArray].forEach(item => {
        const { category, amount, date } = item;

        if(complianceWithThePeriod(date)){
          if (!result[category]) {
            result[category] = 0;
          }
          result[category] += +amount;
        }
      });
    }
    return result;
  }
  const amountsOfExpensesByCategory = computed(() => getAmountsByCategory(expensesByCategory));
  const amountsOfIncomeByCategory = computed(() => getAmountsByCategory(incomeByCategory));

  function getExpensesChartData(dataArray){
    dataArray = dataArray.value;
    let result = {
      labels: [],
      datasets: [],
    };

    dataArray = Object.keys(dataArray).map(category => ({
      category: category,
      amount: dataArray[category]
    }));

    result.labels = dataArray.map(row => row.category);
    result.datasets = [{
      label: 'Сумма',
      data: dataArray.map(row => +row.amount),
    }];

    return result;
  }
  const expensesChartData = computed(() => getExpensesChartData(amountsOfExpensesByCategory));
  const incomeChartData = computed(() => getExpensesChartData(amountsOfIncomeByCategory));

  async function getting(type, object){
    let resp = await fetch(`http://localhost:3000/${type}`);
    object.value = await resp.json();
  }
  (async function getData(){
    await Promise.all([
      getting('expenses', expensesData),
      getting('income', incomeData),
    ]);
  })();

  return {
    type, switchType, period, switchPeriod,
    expensesData, incomeData, expensesByCategory, incomeByCategory,
    amountsOfExpensesByCategory, amountsOfIncomeByCategory,
    expensesChartData, incomeChartData, amountOfExpenses, amountOfIncome,
  };
});