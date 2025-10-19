<template>
  <div class="user-management">
    <h1
      class="header-font text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-amber-600 mb-8"
    >
      用户管理
    </h1>

    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 登录/注册表单 -->
      <div class="treasure-card p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          {{ currentUser ? '用户信息' : '登录/注册' }}
        </h2>

        <form @submit.prevent="handleUserSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              id="name"
              v-model="userForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              :disabled="currentUser"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              id="email"
              v-model="userForm.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              :disabled="currentUser"
            />
          </div>

          <div v-if="!currentUser">
            <button type="submit" class="w-full treasure-button px-4 py-2 rounded-lg font-semibold">
              注册并登录
            </button>
          </div>
        </form>

        <div v-if="currentUser" class="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 class="font-semibold text-green-800 mb-2">当前用户信息</h3>
          <p class="text-sm text-green-700">用户名: {{ currentUser.name }}</p>
          <p class="text-sm text-green-700">邮箱: {{ currentUser.email }}</p>
          <p class="text-sm text-green-700">最高分数: {{ currentUser.bestScore }}</p>
          <p class="text-sm text-green-700">加入日期: {{ formatDate(currentUser.joinDate) }}</p>

          <button
            @click="logout"
            class="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            退出登录
          </button>
        </div>
      </div>

      <!-- 用户列表 -->
      <div class="treasure-card p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">所有用户</h2>

        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div
            v-for="user in users"
            :key="user.id"
            class="p-3 border border-gray-200 rounded-lg flex items-center justify-between"
            :class="{ 'bg-green-50 border-green-200': currentUser && user.id === currentUser.id }"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold"
              >
                {{ user.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-semibold text-gray-800">{{ user.name }}</p>
                <p class="text-xs text-gray-500">分数: {{ user.bestScore }}</p>
              </div>
            </div>
            <span class="text-xs text-gray-500">{{ formatDate(user.joinDate) }}</span>
          </div>
        </div>

        <p v-if="users.length === 0" class="text-center text-gray-500 py-4">暂无用户数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'

export default {
  name: 'UserManagement',
  setup() {
    const gameStore = useGameStore()
    const { currentUser, users } = storeToRefs(gameStore)

    const userForm = reactive({
      name: '',
      email: '',
    })

    const handleUserSubmit = () => {
      if (currentUser.value) return

      const newUser = {
        name: userForm.name,
        email: userForm.email,
      }

      gameStore.addUser(newUser)
      gameStore.setCurrentUser(gameStore.users.find((u) => u.email === userForm.email))

      // 重置表单
      userForm.name = ''
      userForm.email = ''
    }

    const logout = () => {
      gameStore.setCurrentUser(null)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('zh-CN')
    }

    return {
      currentUser,
      users,
      userForm,
      handleUserSubmit,
      logout,
      formatDate,
    }
  },
}
</script>
