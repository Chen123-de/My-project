<template>
  <div class="ranking-page">
    <h1
      class="header-font text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-amber-600 mb-8"
    >
      探险家排行榜
    </h1>

    <div class="max-w-2xl mx-auto">
      <div class="treasure-card p-6">
        <!-- 排行榜头部 -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">顶级探险家</h2>
          <div class="flex items-center space-x-2 text-amber-600">
            <i class="fa fa-trophy"></i>
            <span class="font-semibold">前 {{ Math.min(userRanking.length, 10) }} 名</span>
          </div>
        </div>

        <!-- 排行榜列表 -->
        <div class="space-y-4">
          <div
            v-for="(user, index) in topUsers"
            :key="user.id"
            class="p-4 border border-gray-200 rounded-lg flex items-center"
            :class="getRankingClass(index)"
          >
            <!-- 排名徽章 -->
            <div
              class="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full mr-4 font-bold text-white"
              :class="getRankBadgeClass(index)"
            >
              {{ index + 1 }}
            </div>

            <!-- 用户信息 -->
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold"
                  >
                    {{ user.name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p class="font-semibold text-gray-800">{{ user.name }}</p>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                  </div>
                </div>

                <div class="text-right">
                  <p class="text-lg font-bold text-amber-600">{{ user.bestScore }} 分</p>
                  <p class="text-xs text-gray-500">加入于 {{ formatDate(user.joinDate) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p v-if="userRanking.length === 0" class="text-center text-gray-500 py-8">
          暂无排行榜数据，快去开始游戏吧！
        </p>

        <!-- 当前用户排名 -->
        <div
          v-if="currentUser && currentUserRank > 10"
          class="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <h3 class="font-semibold text-gray-800 mb-2">您的排名</h3>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold"
              >
                {{ currentUser.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-semibold text-gray-800">{{ currentUser.name }}</p>
                <p class="text-sm text-gray-500">第 {{ currentUserRank }} 名</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-amber-600">{{ currentUser.bestScore }} 分</p>
            </div>
          </div>
        </div>

        <div
          v-else-if="!currentUser"
          class="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200 text-center"
        >
          <p class="text-amber-800">
            <i class="fa fa-info-circle mr-2"></i>
            登录后查看您的排名和保存游戏进度
          </p>
          <router-link
            to="/users"
            class="inline-block mt-2 treasure-button px-4 py-2 rounded-lg font-semibold"
          >
            立即登录
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export default {
  name: 'RankingPage',
  setup() {
    const gameStore = useGameStore()
    const { userRanking, currentUser } = storeToRefs(gameStore)

    const topUsers = computed(() => {
      return userRanking.value.slice(0, 10)
    })

    const currentUserRank = computed(() => {
      if (!currentUser.value) return null
      return userRanking.value.findIndex((user) => user.id === currentUser.value.id) + 1
    })

    const getRankingClass = (index) => {
      if (index === 0) return 'bg-amber-50 border-amber-200 shadow-sm'
      if (index === 1) return 'bg-gray-50 border-gray-200'
      if (index === 2) return 'bg-amber-50 border-amber-100'
      return ''
    }

    const getRankBadgeClass = (index) => {
      if (index === 0) return 'bg-amber-500'
      if (index === 1) return 'bg-gray-500'
      if (index === 2) return 'bg-amber-700'
      return 'bg-green-500'
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('zh-CN')
    }

    return {
      userRanking,
      currentUser,
      topUsers,
      currentUserRank,
      getRankingClass,
      getRankBadgeClass,
      formatDate,
    }
  },
}
</script>
