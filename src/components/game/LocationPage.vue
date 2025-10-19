<template>
  <div class="location-page">
    <!-- 返回按钮 -->
    <div class="mb-6">
      <button @click="goBackToMap" class="treasure-button px-4 py-2 rounded-lg font-semibold">
        <i class="fa fa-arrow-left mr-2"></i>返回地图
      </button>
    </div>

    <!-- 地点内容 -->
    <div class="treasure-card p-6">
      <div class="scene-container mb-6">
        <div class="rounded-xl overflow-hidden shadow-lg relative h-80">
          <img
            :src="currentLocationData.image"
            :alt="currentLocationData.name"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end"
          >
            <h3 class="text-2xl font-bold p-4 text-white w-full text-center">
              {{ currentLocationData.name }}
            </h3>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-2xl text-gray-800 mb-4">{{ currentLocationData.name }}</h3>
        <p class="mb-4 text-gray-700">{{ currentLocationData.fullDescription }}</p>
        <p class="text-gray-600">{{ currentLocationData.actionDescription }}</p>

        <p v-if="isCompleted" class="text-green-600 mt-4 font-semibold">
          {{ currentLocationData.completionMessage }}
        </p>
      </div>

      <div class="flex justify-center mb-6" v-if="!isCompleted">
        <button
          @click="handleLocationAction"
          class="location-action treasure-button px-6 py-3 rounded-lg font-semibold"
          :disabled="isProcessing"
        >
          <i class="fa" :class="actionIcon"></i>
          {{ isProcessing ? '处理中...' : currentLocationData.actionText }}
        </button>
      </div>

      <!-- 地点日志 -->
      <div>
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <i class="fa fa-book mr-2 text-green-600"></i>地点日志
        </h3>

        <div
          class="h-48 overflow-y-auto p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm"
        >
          <div v-if="locationLogs.length === 0" class="text-center text-gray-400 italic">
            这个地点还没有日志记录...
          </div>
          <div
            v-else
            v-for="(entry, index) in locationLogs"
            :key="index"
            class="mb-2 p-2 bg-white rounded"
          >
            <span class="text-green-600 text-xs">[{{ entry.timestamp }}]</span>
            <span class="text-gray-700 ml-2">{{ entry.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

export default {
  name: 'LocationPage',
  setup() {
    const gameStore = useGameStore()
    const { currentLocation, adventureLog, isLocationCompleted } = storeToRefs(gameStore)
    const isProcessing = ref(false)

    const locationData = {
      library: {
        name: '古老的图书馆',
        fullDescription: '你来到了一座古老的图书馆，空气中弥漫着尘埃和知识的气息。',
        actionDescription: '你需要找到那本记载着宝藏位置的古籍。',
        actionText: '搜索古籍',
        actionIcon: 'fa-search',
        completionMessage: '你已经在古籍中找到了线索，指向下一个地点。',
        image:
          'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
      script: {
        name: '神秘手稿',
        fullDescription: '你发现了一份神秘的手稿，上面写满了难以理解的古代文字。',
        actionDescription: '你需要破译这些文字，找到宝藏的位置。',
        actionText: '破译文字',
        actionIcon: 'fa-font',
        completionMessage: '你已经成功破译了文字，指向迷雾丛林中的古老神庙。',
        image:
          'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
      jungle: {
        name: '迷雾丛林',
        fullDescription: '你进入了茂密的丛林，周围充满了未知的危险和秘密。',
        actionDescription: '你需要穿越这片危险的丛林，找到神庙的入口。',
        actionText: '穿越丛林',
        actionIcon: 'fa-tree',
        completionMessage: '你成功穿越了丛林，找到了神庙的入口。',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
      temple: {
        name: '古老神庙',
        fullDescription: '你站在古老的神庙前，感受到一股神秘的力量在召唤。',
        actionDescription: '你需要解开神庙大门的古老谜题才能进入。',
        actionText: '解开谜题',
        actionIcon: 'fa-puzzle-piece',
        completionMessage: '你成功解开了谜题，神庙大门缓缓打开。',
        image:
          'https://images.unsplash.com/photo-1564053489984-317bbd824340?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
      chamber: {
        name: '宝藏密室',
        fullDescription: '你小心翼翼地进入了神庙内部，寻找隐藏的宝藏密室。',
        actionDescription: '你需要找到隐藏的宝藏密室入口。',
        actionText: '探索密室',
        actionIcon: 'fa-binoculars',
        completionMessage: '你找到了宝藏密室，里面有一个华丽的宝箱！',
        image: 'https://img95.699pic.com/photo/60012/8289.jpg_wh300.jpg',
      },
      box: {
        name: '神秘宝箱',
        fullDescription: '在密室的中央，你找到了一个华丽的宝箱，上面刻满了神秘的符号...',
        actionDescription: '你需要打开宝箱获取传说中的宝藏。',
        actionText: '打开宝箱',
        actionIcon: 'fa-unlock',
        completionMessage: '恭喜！你找到了传说中的宝藏！',
        image: 'https://imgs.699pic.com/images/700/588/918.jpg!seo.v1',
      },
    }

    const currentLocationData = computed(() => {
      return locationData[currentLocation.value] || locationData.library
    })

    const isCompleted = computed(() => {
      return isLocationCompleted.value(currentLocation.value)
    })

    const locationLogs = computed(() => {
      return adventureLog.value.filter((entry) => entry.location === currentLocation.value)
    })

    const actionIcon = computed(() => {
      return isProcessing.value ? 'fa-spinner fa-spin' : currentLocationData.value.actionIcon
    })

    const goBackToMap = () => {
      gameStore.currentLocation = 'map'
    }

    const handleLocationAction = () => {
      if (isProcessing.value) return

      isProcessing.value = true

      // 模拟异步操作
      setTimeout(() => {
        const success = Math.random() > 0.3 // 70%成功率
        let message = ''
        let progressIncrement = 0

        switch (currentLocation.value) {
          case 'library':
            if (success) {
              message = '你在古籍中发现了一张古老的地图，上面标记了一个神秘的地点!'
              gameStore.completeStep('library')
              progressIncrement = 15
            } else {
              message = '你搜索了很久，但没有找到任何有用的线索。也许需要换个地方找找?'
            }
            break

          case 'script':
            if (success) {
              message = '你成功破译了古代文字! 文字指向迷雾丛林中的一座古老神庙。'
              gameStore.completeStep('script')
              progressIncrement = 15
            } else {
              message = '这些文字太过古老和复杂，你暂时无法完全理解它们的含义。'
            }
            break

          case 'jungle':
            if (success) {
              message = '你成功穿越了危险的丛林，发现了隐藏在深处的神庙入口!'
              gameStore.completeStep('jungle')
              progressIncrement = 15
            } else {
              message = '在穿越丛林时，你遇到了危险，不得不暂时撤退。'
            }
            break

          case 'temple':
            if (success) {
              message = '你成功解开了神庙大门的谜题，大门缓缓打开!'
              gameStore.completeStep('temple')
              progressIncrement = 20
            } else {
              message = '这个谜题太过复杂，你暂时无法解开。'
            }
            break

          case 'chamber':
            if (success) {
              message = '你找到了隐藏的宝藏密室，里面有一个华丽的宝箱!'
              gameStore.completeStep('chamber')
              progressIncrement = 20
            } else {
              message = '你仔细搜索了神庙内部，但暂时没有找到宝藏密室。'
            }
            break

          case 'box':
            if (success) {
              message = '你成功打开了宝箱，里面装满了黄金、宝石和古老的文物!'
              gameStore.completeStep('box')
              progressIncrement = 15

              // 更新用户分数
              if (gameStore.currentUser) {
                gameStore.updateUserScore(gameStore.currentUser.id, 100)
              }
            } else {
              message = '宝箱似乎被某种神秘力量锁住了，你需要找到正确的方法打开它。'
            }
            break
        }

        if (success && progressIncrement > 0) {
          gameStore.updateProgress(gameStore.progress + progressIncrement)
        }

        gameStore.addToLog(message, currentLocation.value)
        isProcessing.value = false
      }, 1500)
    }

    return {
      currentLocationData,
      isCompleted,
      locationLogs,
      isProcessing,
      actionIcon,
      goBackToMap,
      handleLocationAction,
    }
  },
}
</script>
