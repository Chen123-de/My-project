<template>
  <header class="bg-white shadow-sm">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <h1
            class="header-font text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-amber-600"
          >
            <i class="fa fa-map-signs mr-2"></i>神秘宝藏探险
          </h1>
        </div>

        <nav class="flex space-x-4">
          <router-link
            to="/"
            class="px-4 py-2 rounded-lg transition-colors"
            :class="[
              $route.name === 'home'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-600 hover:bg-gray-100',
            ]"
          >
            首页
          </router-link>
          <router-link
            to="/game"
            class="px-4 py-2 rounded-lg transition-colors"
            :class="[
              $route.name === 'game'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-600 hover:bg-gray-100',
            ]"
          >
            游戏
          </router-link>
          <router-link
            to="/users"
            class="px-4 py-2 rounded-lg transition-colors"
            :class="[
              $route.name === 'users'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-600 hover:bg-gray-100',
            ]"
          >
            用户管理
          </router-link>
          <router-link
            to="/ranking"
            class="px-4 py-2 rounded-lg transition-colors"
            :class="[
              $route.name === 'ranking'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-600 hover:bg-gray-100',
            ]"
          >
            排行榜
          </router-link>
        </nav>

        <div class="flex items-center space-x-4">
          <AudioControl />
          <div v-if="currentUser" class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">欢迎, {{ currentUser.name }}</span>
            <div
              class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold"
            >
              {{ currentUser.name.charAt(0).toUpperCase() }}
            </div>
          </div>
          <router-link
            v-else
            to="/users"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            登录/注册
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import AudioControl from '@/components/game/AudioControl.vue'

export default {
  name: 'AppHeader',
  components: {
    AudioControl,
  },
  setup() {
    const gameStore = useGameStore()
    const { currentUser } = storeToRefs(gameStore)

    return {
      currentUser,
    }
  },
}
</script>
