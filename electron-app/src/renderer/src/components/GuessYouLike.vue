<template>
  <div class="guess-you-like">
    <div class="section-header">
      <span class="title">猜你喜欢</span>
      <svg class="arrow-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
      </svg>
      <span class="refresh-icon" @click="refreshData">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M17.65 6.35A7.96 7.96 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        </svg>
      </span>
    </div>

    <div class="grid-container">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="grid-item"
        @click="handleClick(item)"
      >
        <img :src="item.cover" class="cover-img" />
        <div class="play-count">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
          {{ formatCount(item.plays) }}
        </div>
        <div
          class="title-bar"
          :style="{ background: bgColors[index % bgColors.length] }"
        >
          <span class="title-text">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bgColors = [
  '#7a7a6e', '#836262', '#8c5d74', '#887061',
  '#7d6b6b', '#944967', '#8d8177'
]

const allItems = [
  { id: 1, cover: 'https://picsum.photos/200/200?random=51', title: '推荐歌单1', plays: 1200000 },
  { id: 2, cover: 'https://picsum.photos/200/200?random=52', title: '推荐歌单2', plays: 980000 },
  { id: 3, cover: 'https://picsum.photos/200/200?random=53', title: '推荐歌单3', plays: 15600000 },
  { id: 4, cover: 'https://picsum.photos/200/200?random=54', title: '推荐歌单4', plays: 8300000 },
  { id: 5, cover: 'https://picsum.photos/200/200?random=55', title: '推荐歌单5', plays: 2200000 },
  { id: 6, cover: 'https://picsum.photos/200/200?random=56', title: '推荐歌单6', plays: 610000 },
  { id: 7, cover: 'https://picsum.photos/200/200?random=57', title: '推荐歌单7', plays: 4300000 },
  { id: 8, cover: 'https://picsum.photos/200/200?random=58', title: '推荐歌单8', plays: 350000 },
  { id: 9, cover: 'https://picsum.photos/200/200?random=61', title: '热门推荐1', plays: 5100000 },
  { id: 10, cover: 'https://picsum.photos/200/200?random=62', title: '热门推荐2', plays: 780000 },
  { id: 11, cover: 'https://picsum.photos/200/200?random=63', title: '热门推荐3', plays: 2900000 },
  { id: 12, cover: 'https://picsum.photos/200/200?random=64', title: '热门推荐4', plays: 1800000 },
  { id: 13, cover: 'https://picsum.photos/200/200?random=65', title: '新歌精选1', plays: 690000 },
  { id: 14, cover: 'https://picsum.photos/200/200?random=66', title: '新歌精选2', plays: 430000 },
  { id: 15, cover: 'https://picsum.photos/200/200?random=67', title: '新歌精选3', plays: 540000 },
  { id: 16, cover: 'https://picsum.photos/200/200?random=68', title: '经典重温1', plays: 820000 },
  { id: 17, cover: 'https://picsum.photos/200/200?random=69', title: '经典重温2', plays: 670000 },
  { id: 18, cover: 'https://picsum.photos/200/200?random=70', title: '经典重温3', plays: 910000 },
  { id: 19, cover: 'https://picsum.photos/200/200?random=71', title: '小众发现1', plays: 120000 },
  { id: 20, cover: 'https://picsum.photos/200/200?random=72', title: '小众发现2', plays: 230000 },
]

function getRandomItems() {
  const shuffled = [...allItems].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 10)
  return selected.map(item => ({
    ...item,
    plays: Math.floor(item.plays * (0.8 + Math.random() * 0.4))
  }))
}

const items = ref(getRandomItems())

function formatCount(num) {
  if (!num) return '0'
  if (num >= 1e8) return (num / 1e8).toFixed(1) + '亿'
  if (num >= 1e7) return (num / 1e7).toFixed(1) + '千万'
  if (num >= 1e4) return (num / 1e4).toFixed(1) + '万'
  return num.toString()
}

function handleClick(item) {
  console.log('点击了:', item.title)
}

function refreshData() {
  items.value = getRandomItems()
}
</script>

<style scoped>
.guess-you-like {
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 16px;
}
.title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}
.arrow-icon {
  width: 22px;
  height: 22px;
  margin-left: 6px;
  color: #999;
}
.refresh-icon {
  margin-left: auto;
  cursor: pointer;
  color: #999;
  display: flex;
  align-items: center;
}
.refresh-icon:hover {
  color: #333;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.grid-item {
  position: relative;
  aspect-ratio: 278 / 382;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
}

.cover-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.play-count {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 2px;
  background: rgba(0,0,0,0.6);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  color: #fff;
  z-index: 1;
}

.title-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 58px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  z-index: 1;
}
.title-text {
  font-size: 13px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #fff;
}
</style>
