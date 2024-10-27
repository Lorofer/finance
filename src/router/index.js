import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'expenses',
    //   component: () => import('../views/Expenses.vue')
    // },
    // {
    //   path: '/income',
    //   name: 'income',
    //   component: () => import('../views/Income.vue')
    // },
  ]
})

export default router
