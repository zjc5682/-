<template>
  <div class="poetry-fm">
    <div class="fm-header">
      <span class="dotted-line"></span>
      <span class="fm-title">随心听FM</span>
      <span class="dotted-line"></span>
    </div>

    <el-carousel
      :interval="4000"
      arrow="hover"
      indicator-position="none"
      height="auto"
      class="fm-carousel"
    >
      <el-carousel-item v-for="item in poems" :key="item.id">
        <div class="fm-content">
          <img :src="item.cover" class="fm-cover" />
          <div class="fm-info">
            <div class="fm-text">{{ item.title }}</div>
            <div class="fm-meta">
              播单：{{ item.playlist }}  {{ item.plays }}次播放
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="wave-line">
      <span v-for="n in 20" :key="n" class="wave-bar"></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const poems = ref([
  {
    id: 1,
    title: '窦靖童一开口，唱哭那英，也唱哭整个港乐时代',
    cover: 'https://picsum.photos/80/80?random=62',
    playlist: '音乐咖啡馆',
    plays: '47223'
  },
  {
    id: 2,
    title: '春江花月夜',
    cover: 'https://picsum.photos/80/80?random=60',
    playlist: '古诗词鉴赏',
    plays: '1200'
  },
  {
    id: 3,
    title: '静夜思',
    cover: 'https://picsum.photos/80/80?random=61',
    playlist: '唐诗三百首',
    plays: '980'
  },
  {
    id: 4,
    title: '当你老了',
    cover: 'https://picsum.photos/80/80?random=63',
    playlist: '情感电台',
    plays: '3500'
  },
  {
    id: 5,
    title: '鲁迅先生的二三事',
    cover: 'https://picsum.photos/80/80?random=64',
    playlist: '人物传记',
    plays: '2100'
  }
])
</script>

<style scoped>
.poetry-fm {
  background: linear-gradient(135deg, #56b4a2, #3d8b7e);
  border-radius: 16px;
  padding: 12px 16px 8px;
  color: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  flex: 1;
  height: 160px;
}

.fm-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.dotted-line {
  width: 40px;
  height: 0;
  border-top: 2px dotted rgba(255,255,255,0.6);
  margin: 0 8px;
}
.fm-title {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 2px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.fm-carousel {
  flex: 1;
}
:deep(.fm-carousel .el-carousel__container) {
  height: 100% !important;
}
:deep(.fm-carousel .el-carousel__item) {
  height: 100% !important;
}

.fm-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  height: 100%;
}
.fm-cover {
  width: 55px;
  height: 55px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}
.fm-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.fm-text {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 4px;
}
.fm-meta {
  font-size: 11px;
  opacity: 0.85;
}

:deep(.el-carousel__arrow) {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 32px;
  height: 32px;
}
:deep(.el-carousel__arrow:hover) {
  background: rgba(255, 255, 255, 0.5);
}
:deep(.el-carousel__arrow i) {
  font-size: 14px;
  color: #fff;
}
:deep(.el-carousel__arrow--left) {
  left: 10px !important;
}
:deep(.el-carousel__arrow--right) {
  right: 10px !important;
}

.wave-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  height: 14px;
  margin-top: 4px;
}
.wave-bar {
  display: inline-block;
  width: 3px;
  height: 10px;
  background: rgba(255,255,255,0.5);
  border-radius: 1px;
  animation: wave 0.8s ease-in-out infinite alternate;
}
.wave-bar:nth-child(even) {
  animation-delay: 0.2s;
  height: 6px;
}
@keyframes wave {
  from { transform: scaleY(1); }
  to { transform: scaleY(1.8); }
}
</style>
