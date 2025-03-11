import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/dashbord',
      name: 'dashbord',
      component: () => import('../views/HomeView.vue')
    }
  ],
})

export default router
