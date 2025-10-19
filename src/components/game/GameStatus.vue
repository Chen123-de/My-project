<template>
  <div class="game-status text-center">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-800 mb-2">探险状态</h2>
      <div class="flex justify-center mb-4">
        <div
          class="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center border-4 border-white shadow-lg"
        >
          <i class="fa" :class="statusIcon" :style="{ color: statusColor }"></i>
        </div>
      </div>
      <p class="text-gray-600">{{ statusText }}</p>
    </div>

    <div class="flex justify-center space-x-4">
      <button
        v-if="hasProgress"
        @click="continueGame"
        class="treasure-button px-6 py-3 rounded-lg font-semibold"
      >
        <i class="fa fa-play mr-2"></i>继续探险
      </button>
      <button @click="newGame" class="treasure-button px-6 py-3 rounded-lg font-semibold">
        <i class="fa fa-compass mr-2"></i>{{ hasProgress ? '重新开始' : '开始新游戏' }}
      </button>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export default {
  name: 'GameStatus',
  setup() {
    const gameStore = useGameStore()
    const { currentStep, progress, completedSteps } = storeToRefs(gameStore)

    const hasProgress = computed(() => {
      return currentStep.value > 0
    })

    const statusIcon = computed(() => {
      if (progress.value === 100) return 'fa-trophy text-amber-500 text-3xl'
      if (progress.value >= 50) return 'fa-map-signs text-green-600 text-3xl'
      if (progress.value > 0) return 'fa-search text-green-500 text-3xl'
      return 'fa-question text-green-600 text-3xl'
    })

    const statusColor = computed(() => {
      if (progress.value === 100) return '#d69e2e'
      if (progress.value >= 50) return '#38a169'
      if (progress.value > 0) return '#48bb78'
      return '#38a169'
    })

    const statusText = computed(() => {
      if (progress.value === 100) {
        return '恭喜！你已经找到了所有宝藏！'
      } else if (progress.value > 0) {
        return `探险进度: ${progress.value}% - 已访问 ${completedSteps.value.length} 个地点`
      } else {
        return '准备开始探险...'
      }
    })

    const continueGame = () => {
      const lastLocation =
        completedSteps.value.length > 0
          ? completedSteps.value[completedSteps.value.length - 1]
          : 'library'
      gameStore.currentLocation = lastLocation
    }

    const newGame = () => {
      if (confirm('确定要开始新游戏吗？当前进度将会丢失。')) {
        gameStore.resetGame()
      }
    }

    return {
      hasProgress,
      statusIcon,
      statusColor,
      statusText,
      continueGame,
      newGame,
    }
  },
}
</script>
