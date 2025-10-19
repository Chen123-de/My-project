import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import GamePage from '@/views/GamePage.vue'
import UserManagement from '@/views/UserManagement.vue'
import RankingPage from '@/views/RankingPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/game',
    name: 'game',
    component: GamePage,
  },
  {
    path: '/users',
    name: 'users',
    component: UserManagement,
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: RankingPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
