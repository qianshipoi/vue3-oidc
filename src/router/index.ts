import { createWebHistory, createRouter } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/callback',
    name: 'Callback',
    component: () => import('../views/Callback.vue')
  },
  {
    path: '/logout-callback',
    name: 'LogoutCallback',
    component: () => import('../views/LogoutCallback.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
