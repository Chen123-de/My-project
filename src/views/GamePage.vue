<template>
  <div class="game-container">
    <!-- 装饰元素 -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div
        class="absolute top-10 left-10 text-amber-500 text-6xl opacity-20 floating"
        style="animation-delay: 0s"
      >
        <i class="fa fa-diamond"></i>
      </div>
      <div
        class="absolute top-40 right-20 text-amber-500 text-4xl opacity-30 floating"
        style="animation-delay: 1s"
      >
        <i class="fa fa-map"></i>
      </div>
      <div
        class="absolute bottom-20 left-1/4 text-amber-500 text-5xl opacity-25 floating"
        style="animation-delay: 2s"
      >
        <i class="fa fa-treasure-chest"></i>
      </div>
    </div>

    <TreasureMap v-if="currentLocation === 'map'" />
    <LocationPage v-else />
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import TreasureMap from '@/components/game/TreasureMap.vue'
import LocationPage from '@/components/game/LocationPage.vue'

export default {
  name: 'GamePage',
  components: {
    TreasureMap,
    LocationPage,
  },
  setup() {
    const gameStore = useGameStore()
    const { currentLocation } = storeToRefs(gameStore)

    return {
      currentLocation,
    }
  },
}
</script>

<style scoped>
.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
