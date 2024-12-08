import {computed, ref} from 'vue';
import {defineStore} from 'pinia';

export const useDateStore = defineStore('dateStore', () => {
    const months = [
        "января", "февраля", "марта", "апреля",
        "мая", "июня", "июля", "августа",
        "сентября", "октября", "ноября", "декабря"
    ]

    function dateConversion(dateStr) {
        let date = new Date(dateStr);
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} г.`
    }

    return {
        dateConversion
    }
});