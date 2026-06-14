<template>
  <div class="ranking-card">
    <div class="ranking-header">
      <div class="ranking-title">
        <span class="title-main">高分必听</span>
        <span class="title-sub">今日最热</span>
      </div>
      <div class="title-more">查看全部</div>
    </div>

    <div class="ranking-list">
      <div v-for="(item, index) in items" :key="index" class="ranking-item">
        <div class="item-badge" :style="{ background: item.badgeColor }">{{ index + 1 }}</div>
        <img :src="item.cover" class="item-cover" />
        <div class="item-title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    badgeColor: '#f4874b',
    cover: 'https://picsum.photos/60/60?random=71',
    title: '体制内 | 小职员们的聊天局'
  },
  {
    badgeColor: '#5b8def',
    cover: 'https://picsum.photos/60/60?random=72',
    title: '不完全淑女'
  },
  {
    badgeColor: '#e8917c',
    cover: 'https://picsum.photos/60/60?random=73',
    title: '超燃音浪|车载dj最强音'
  },
  {
    badgeColor: '#8e8e93',
    cover: 'https://picsum.photos/60/60?random=74',
    title: 'Woo话可说'
  }
])
</script>

<style scoped>
.ranking-card {
  background: #9db5a8;
  border-radius: 16px;
  padding: 18px;
  color: #fff;
  flex: 1;
  min-height: 280px;
  display: flex;
  flex-direction: column;
}

.ranking-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 18px;
}
.ranking-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.title-main {
  font-size: 18px;
  font-weight: 700;
}
.title-sub {
  font-size: 13px;
  opacity: 0.8;
}
.title-more {
  font-size: 12px;
  opacity: 0.75;
  cursor: pointer;
}

.ranking-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.ranking-item {
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.item-badge {
  position: absolute;
  top: -6px;
  left: -6px;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-cover {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 8px;
}

.item-title {
  font-size: 12px;
  text-align: center;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
