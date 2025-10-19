<template>
  <div class="audio-control">
    <div class="music-control" :class="{ muted: !audioEnabled || isMuted }" @click="toggleAudio">
      <i class="fa" :class="audioIcon"></i>
    </div>

    <!-- 音频权限提示 -->
    <div v-if="showPermissionPrompt" class="audio-permission-prompt">
      <i class="fa fa-volume-up text-xl"></i>
      <span>点击启用背景音乐，增强游戏体验</span>
      <button @click="enableAudio">启用音乐</button>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'AudioControl',
  setup() {
    const gameStore = useGameStore()
    const { musicEnabled, audioEnabled } = storeToRefs(gameStore)
    const isMuted = ref(!musicEnabled.value)
    const showPermissionPrompt = ref(!audioEnabled.value)

    const audioElement = new Audio()

    // 音频轨道
    const tracks = {
      map: 'https://music.163.com/song/media/outer/url?id=1867217736.mp3',
      library: 'https://music.163.com/song/media/outer/url?id=1867217736.mp3',
      temple: 'https://music.163.com/song/media/outer/url?id=1867217736.mp3',
      treasure: 'https://music.163.com/song/media/outer/url?id=1867217736.mp3',
    }

    const currentTrack = ref(null)

    const audioIcon = computed(() => {
      if (!audioEnabled.value) {
        return 'fa-volume-off text-gray-500'
      } else if (isMuted.value) {
        return 'fa-volume-off text-gray-500'
      } else {
        return 'fa-music text-green-700'
      }
    })

    const enableAudio = () => {
      gameStore.audioEnabled = true
      gameStore.musicEnabled = true
      isMuted.value = false
      showPermissionPrompt.value = false

      // 尝试播放当前曲目
      if (currentTrack.value) {
        play(currentTrack.value)
      }
    }

    const play = (trackName) => {
      if (!audioEnabled.value) {
        showPermissionPrompt.value = true
        return
      }

      if (trackName === 'none') {
        stop()
        return
      }

      if (tracks[trackName] && currentTrack.value !== trackName) {
        audioElement.src = tracks[trackName]
        currentTrack.value = trackName

        if (!isMuted.value) {
          audioElement.play().catch((e) => {
            console.log('Audio play failed:', e)
            showPermissionPrompt.value = true
          })
        }
      }
    }

    const stop = () => {
      audioElement.pause()
      currentTrack.value = null
    }

    const toggleAudio = () => {
      if (!audioEnabled.value) {
        enableAudio()
        return
      }

      isMuted.value = !isMuted.value
      gameStore.musicEnabled = !isMuted.value

      if (isMuted.value) {
        audioElement.pause()
      } else {
        audioElement.play().catch((e) => {
          console.log('Audio play failed:', e)
        })
      }
    }

    // 预加载音频
    onMounted(() => {
      audioElement.volume = 0.5
      audioElement.loop = true

      // 如果之前已启用音频，恢复设置
      if (audioEnabled.value) {
        if (musicEnabled.value) {
          play('map')
        }
      } else {
        // 显示权限提示
        setTimeout(() => {
          showPermissionPrompt.value = true
        }, 1000)
      }
    })

    return {
      audioEnabled,
      isMuted,
      showPermissionPrompt,
      audioIcon,
      enableAudio,
      toggleAudio,
    }
  },
}
</script>

<style scoped>
.music-control {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.music-control:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.music-control.muted {
  background: rgba(255, 255, 255, 0.5);
}

.audio-permission-prompt {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(44, 85, 48, 0.9);
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: fadeInUp 0.5s ease;
}

.audio-permission-prompt button {
  background: white;
  color: #2c5530;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.audio-permission-prompt button:hover {
  background: #f8f5e6;
  transform: translateY(-2px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
