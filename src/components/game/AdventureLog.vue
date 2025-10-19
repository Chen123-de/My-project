<template>
  <div class="adventure-log">
    <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
      <i class="fa fa-book mr-2 text-green-600"></i>探险日志
    </h3>

    <div class="h-64 overflow-y-auto p-4 bg-amber-50 rounded-lg border border-amber-200">
      <div v-if="adventureLog.length === 0" class="text-center text-gray-400 italic">
        探险日志将在这里显示...
      </div>
      <div
        v-else
        v-for="(entry, index) in adventureLog"
        :key="index"
        class="log-entry mb-3 p-3 bg-white rounded-lg shadow-sm"
      >
        <div class="flex items-start">
          <i class="fa fa-circle text-green-500 text-xs mt-1 mr-2"></i>
          <span class="text-gray-700">{{ entry.message }}</span>
        </div>
        <div class="text-xs text-gray-500 mt-1 ml-4">
          {{ entry.timestamp }} - {{ getLocationName(entry.location) }}
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
  name: 'AdventureLog',
  setup() {
    const gameStore = useGameStore()
    const { adventureLog } = storeToRefs(gameStore)

    const locationNames = {
      map: '地图',
      library: '图书馆',
      script: '手稿',
      jungle: '丛林',
      temple: '神庙',
      chamber: '密室',
      box: '宝箱',
    }

    const getLocationName = (location) => {
      return locationNames[location] || location
    }

    return {
      adventureLog,
      getLocationName,
    }
  },
}
</script>

<style scoped>
.log-entry {
  animation: slideIn 0.5s ease forwards;
  opacity: 0;
  transform: translateX(-20px);
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
