<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
    <AppHeader />
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
}
</script>

<style>
/* 全局样式 */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');

:root {
  --primary: #2c5530;
  --secondary: #4a7c59;
  --accent: #d4af37;
  --light: #f8f5e6;
  --dark: #2a2a2a;
  --success: #38a169;
  --warning: #d69e2e;
  --gradient: linear-gradient(135deg, #2c5530 0%, #4a7c59 100%);
  --gold-gradient: linear-gradient(135deg, #d4af37 0%, #f9e076 100%);
}

body {
  font-family: 'Montserrat', sans-serif;
  background-color: var(--light);
  color: var(--dark);
  margin: 0;
  padding: 0;
}

.header-font {
  font-family: 'Playfair Display', serif;
}

.treasure-card {
  background: linear-gradient(145deg, #ffffff, #f8f5e6);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.treasure-button {
  background: var(--gradient);
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(44, 85, 48, 0.2);
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.treasure-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(44, 85, 48, 0.3);
}

.progress-bar {
  background: linear-gradient(to right, var(--secondary), var(--accent));
  border-radius: 10px;
  height: 12px;
  transition: width 0.5s ease;
}

/* 确保容器正确显示 */
.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

/* 网格布局修复 */
.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* 图片样式修复 */
img {
  max-width: 100%;
  height: auto;
}

/* 浮动动画 */
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

/* 位置卡片样式修复 */
.location-card {
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.location-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.location-card.locked {
  opacity: 0.6;
  filter: grayscale(0.7);
  cursor: not-allowed;
}

.location-card.locked:hover {
  transform: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.location-completed {
  position: relative;
  overflow: hidden;
}

.location-completed::after {
  content: '✓';
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--success);
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
</style>
