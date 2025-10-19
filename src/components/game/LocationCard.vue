<template>
  <div
    class="location-card treasure-card p-5 transition-all duration-300 cursor-pointer"
    :class="{
      locked: !location.unlocked,
      'location-completed': location.completed,
      'hover:scale-105 hover:shadow-xl': location.unlocked,
    }"
    @click="$emit('select', location.id)"
  >
    <div class="h-40 overflow-hidden rounded-lg mb-4">
      <img
        :src="location.image"
        :alt="location.name"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
    <h3 class="text-xl font-bold text-gray-800 mb-2">{{ location.name }}</h3>
    <p class="text-sm text-gray-600 mb-4">{{ location.description }}</p>
    <div class="flex justify-between items-center">
      <span class="text-xs px-2 py-1 rounded" :class="typeClasses">
        {{ location.type }}
      </span>
      <span class="location-status text-xs" :class="statusClasses">
        {{ statusText }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationCard',
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  emits: ['select'],
  computed: {
    typeClasses() {
      const typeMap = {
        线索收集: 'bg-green-100 text-green-800',
        文字破译: 'bg-amber-100 text-amber-800',
        生存挑战: 'bg-green-100 text-green-800',
        谜题挑战: 'bg-amber-100 text-amber-800',
        探索挑战: 'bg-green-100 text-green-800',
        最终挑战: 'bg-amber-100 text-amber-800',
      }
      return typeMap[this.location.type] || 'bg-gray-100 text-gray-800'
    },
    statusClasses() {
      if (this.location.completed) {
        return 'text-green-600'
      } else if (this.location.unlocked) {
        return 'text-green-600'
      } else {
        return 'text-gray-500'
      }
    },
    statusText() {
      if (this.location.completed) {
        return '已完成'
      } else if (this.location.unlocked) {
        return '可探索'
      } else {
        return '未解锁'
      }
    },
  },
}
</script>

<style scoped>
.location-completed {
  position: relative;
  overflow: hidden;
}

.location-completed::after {
  content: '✓';
  position: absolute;
  top: 10px;
  right: 10px;
  background: #38a169;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.locked {
  opacity: 0.6;
  filter: grayscale(0.7);
  cursor: not-allowed;
}

.locked:hover {
  transform: none !important;
}
</style>
