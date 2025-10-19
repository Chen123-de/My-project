import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGameStore = defineStore('game', () => {
  // 游戏状态
  const currentStep = ref(0)
  const completedSteps = ref([])
  const currentLocation = ref('map')
  const progress = ref(0)
  const adventureLog = ref([])
  const unlockedLocations = ref(['library'])

  // 音频状态
  const musicEnabled = ref(false)
  const audioEnabled = ref(false)
  const currentTrack = ref('map')

  // 用户状态
  const currentUser = ref(null)
  const users = ref([])

  // 计算属性
  const isLocationCompleted = computed(() => {
    return (location) => completedSteps.value.includes(location)
  })

  const isLocationUnlocked = computed(() => {
    return (location) => unlockedLocations.value.includes(location)
  })

  const userRanking = computed(() => {
    return users.value
      .filter((user) => user.bestScore > 0)
      .sort((a, b) => b.bestScore - a.bestScore)
  })

  // 操作方法
  const addToLog = (message, location = 'map') => {
    adventureLog.value.push({
      message,
      timestamp: new Date().toLocaleTimeString(),
      location,
    })
    saveState()
  }

  const completeStep = (stepName) => {
    if (!completedSteps.value.includes(stepName)) {
      completedSteps.value.push(stepName)
      currentStep.value++

      // 解锁下一个地点
      const locationOrder = ['library', 'script', 'jungle', 'temple', 'chamber', 'box']
      const currentIndex = locationOrder.indexOf(stepName)
      if (currentIndex >= 0 && currentIndex < locationOrder.length - 1) {
        const nextLocation = locationOrder[currentIndex + 1]
        if (!unlockedLocations.value.includes(nextLocation)) {
          unlockedLocations.value.push(nextLocation)
        }
      }

      saveState()
    }
  }

  const updateProgress = (percentage) => {
    progress.value = percentage
    saveState()
  }

  const resetGame = () => {
    currentStep.value = 0
    completedSteps.value = []
    currentLocation.value = 'map'
    progress.value = 0
    adventureLog.value = []
    unlockedLocations.value = ['library']
    saveState()
  }

  const saveState = () => {
    const state = {
      currentStep: currentStep.value,
      completedSteps: completedSteps.value,
      currentLocation: currentLocation.value,
      progress: progress.value,
      adventureLog: adventureLog.value,
      unlockedLocations: unlockedLocations.value,
      musicEnabled: musicEnabled.value,
      audioEnabled: audioEnabled.value,
      currentTrack: currentTrack.value,
    }
    localStorage.setItem('treasureGameState', JSON.stringify(state))
  }

  const loadState = () => {
    const saved = localStorage.getItem('treasureGameState')
    if (saved) {
      const state = JSON.parse(saved)
      currentStep.value = state.currentStep
      completedSteps.value = state.completedSteps
      currentLocation.value = state.currentLocation
      progress.value = state.progress
      adventureLog.value = state.adventureLog
      unlockedLocations.value = state.unlockedLocations
      musicEnabled.value = state.musicEnabled
      audioEnabled.value = state.audioEnabled
      currentTrack.value = state.currentTrack
    }
  }

  // 用户管理方法
  const setCurrentUser = (user) => {
    currentUser.value = user
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  const loadCurrentUser = () => {
    const saved = localStorage.getItem('currentUser')
    if (saved) {
      currentUser.value = JSON.parse(saved)
    }
  }

  const addUser = (user) => {
    users.value.push({
      ...user,
      id: Date.now().toString(),
      bestScore: 0,
      joinDate: new Date().toISOString(),
    })
    saveUsers()
  }

  const updateUserScore = (userId, score) => {
    const user = users.value.find((u) => u.id === userId)
    if (user && score > user.bestScore) {
      user.bestScore = score
      saveUsers()
    }
  }

  const saveUsers = () => {
    localStorage.setItem('gameUsers', JSON.stringify(users.value))
  }

  const loadUsers = () => {
    const saved = localStorage.getItem('gameUsers')
    if (saved) {
      users.value = JSON.parse(saved)
    }
  }

  // 初始化
  loadState()
  loadUsers()
  loadCurrentUser()

  return {
    // 状态
    currentStep,
    completedSteps,
    currentLocation,
    progress,
    adventureLog,
    unlockedLocations,
    musicEnabled,
    audioEnabled,
    currentTrack,
    currentUser,
    users,

    // 计算属性
    isLocationCompleted,
    isLocationUnlocked,
    userRanking,

    // 方法
    addToLog,
    completeStep,
    updateProgress,
    resetGame,
    setCurrentUser,
    addUser,
    updateUserScore,
  }
})
