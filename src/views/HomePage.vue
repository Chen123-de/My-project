<template>
  <div class="text-center py-12">
    <h1
      class="header-font text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-amber-600 mb-6"
    >
      <i class="fa fa-map-signs mr-4"></i>神秘宝藏探险
    </h1>

    <p class="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
      探索不同地点，解开古老的秘密，找到传说中的宝藏
    </p>

    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div class="treasure-card p-6">
        <i class="fa fa-compass text-4xl text-amber-500 mb-4"></i>
        <h3 class="text-xl font-bold text-gray-800 mb-2">开始探险</h3>
        <p class="text-gray-600 mb-4">选择你的冒险家身份，开始寻宝之旅</p>
        <router-link
          to="/game"
          class="treasure-button px-6 py-3 rounded-lg font-semibold inline-block"
        >
          开始游戏
        </router-link>
      </div>

      <div class="treasure-card p-6">
        <i class="fa fa-trophy text-4xl text-amber-500 mb-4"></i>
        <h3 class="text-xl font-bold text-gray-800 mb-2">查看排行榜</h3>
        <p class="text-gray-600 mb-4">查看其他探险家的成就和排名</p>
        <router-link
          to="/ranking"
          class="treasure-button px-6 py-3 rounded-lg font-semibold inline-block"
        >
          查看排行榜
        </router-link>
      </div>
    </div>

    <div class="max-w-2xl mx-auto treasure-card p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">游戏特色</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <i class="fa fa-map text-2xl text-green-600 mb-2"></i>
          <h4 class="font-semibold text-gray-800">多个地点</h4>
          <p class="text-sm text-gray-600">探索6个不同的神秘地点</p>
        </div>
        <div class="text-center">
          <i class="fa fa-puzzle-piece text-2xl text-amber-600 mb-2"></i>
          <h4 class="font-semibold text-gray-800">解谜挑战</h4>
          <p class="text-sm text-gray-600">解开各种谜题获取线索</p>
        </div>
        <div class="text-center">
          <i class="fa fa-users text-2xl text-blue-600 mb-2"></i>
          <h4 class="font-semibold text-gray-800">用户系统</h4>
          <p class="text-sm text-gray-600">保存进度和竞争排名</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>
