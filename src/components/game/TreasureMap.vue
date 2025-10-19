<template>
  <div class="map-page">
    <!-- 标题区域 -->
    <header class="text-center mb-12">
      <h1
        class="header-font text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-amber-600 mb-4"
      >
        探险地图
      </h1>
      <p class="text-lg text-gray-700 max-w-2xl mx-auto">选择地点开始探索，解锁新的区域</p>
    </header>

    <!-- 地点选择区域 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <LocationCard
        v-for="location in locations"
        :key="location.id"
        :location="location"
        @select="handleLocationSelect"
      />
    </div>

    <!-- 游戏状态区域 -->
    <div class="max-w-3xl mx-auto">
      <div class="treasure-card p-6">
        <GameStatus />

        <!-- 进度条 -->
        <div class="mt-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <i class="fa fa-flag-checkered mr-2 text-green-600"></i>探险进度
          </h3>

          <div class="mb-2 flex justify-between">
            <span class="text-sm font-medium text-gray-600">完成度</span>
            <span class="text-sm font-bold text-green-600">{{ progress }}%</span>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div class="progress-bar h-3 rounded-full" :style="{ width: progress + '%' }"></div>
          </div>

          <div class="grid grid-cols-5 gap-2 text-center text-xs text-gray-500">
            <div>起点</div>
            <div>线索</div>
            <div>神庙</div>
            <div>密室</div>
            <div>宝藏</div>
          </div>
        </div>

        <!-- 探险日志 -->
        <AdventureLog />
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import LocationCard from '@/components/game/LocationCard.vue'
import GameStatus from '@/components/game/GameStatus.vue'
import AdventureLog from '@/components/game/AdventureLog.vue'

export default {
  name: 'TreasureMap',
  components: {
    LocationCard,
    GameStatus,
    AdventureLog,
  },
  setup() {
    const gameStore = useGameStore()
    const { progress, unlockedLocations, isLocationCompleted } = storeToRefs(gameStore)

    const locations = [
      {
        id: 'library',
        name: '古老的图书馆',
        description: '在尘封的古籍中寻找第一个线索',
        type: '线索收集',
        image:
          'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        unlocked: true,
      },
      {
        id: 'script',
        name: '神秘手稿',
        description: '解码古代文字，揭示宝藏位置',
        type: '文字破译',
        image:
          'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        unlocked: false,
      },
      {
        id: 'jungle',
        name: '迷雾丛林',
        description: '穿越危险丛林，寻找神庙入口',
        type: '生存挑战',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        unlocked: false,
      },
      {
        id: 'temple',
        name: '古老神庙',
        description: '解开神庙大门的古老谜题',
        type: '谜题挑战',
        image:
          'https://images.unsplash.com/photo-1564053489984-317bbd824340?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        unlocked: false,
      },
      {
        id: 'chamber',
        name: '宝藏密室',
        description: '探索隐藏的密室，寻找宝藏',
        type: '探索挑战',
        image: 'https://img95.699pic.com/photo/60012/8289.jpg_wh300.jpg',
        unlocked: false,
      },
      {
        id: 'box',
        name: '神秘宝箱',
        description: '打开宝箱，获取传说中的宝藏',
        type: '最终挑战',
        image: 'https://imgs.699pic.com/images/700/588/918.jpg!seo.v1',
        unlocked: false,
      },
    ]

    const handleLocationSelect = (locationId) => {
      if (unlockedLocations.value.includes(locationId)) {
        gameStore.currentLocation = locationId
      }
    }

    // 更新地点的解锁状态
    const updatedLocations = locations.map((loc) => ({
      ...loc,
      unlocked: unlockedLocations.value.includes(loc.id),
      completed: isLocationCompleted.value(loc.id),
    }))

    return {
      locations: updatedLocations,
      progress,
      handleLocationSelect,
    }
  },
}
</script>
