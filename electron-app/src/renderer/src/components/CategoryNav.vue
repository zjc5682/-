<template>
  <div class="category-nav">
    <div class="nav-inner">
      <div
        v-for="(item, index) in categories"
        :key="item.key"
        class="nav-item"
        :class="{ active: activeKey === item.key }"
        @click="handleClick(item, index)"
      >
        <span class="nav-text">{{ item.label }}</span>
        <span v-if="item.vip" class="vip-tag">VIP</span>
      </div>

      <div class="nav-item nav-more" @click="showMore = !showMore">
        <span class="nav-text">更多</span>
        <el-icon :class="{ 'rotate-180': showMore }" class="transition-transform duration-200">
          <ArrowDown />
        </el-icon>
      </div>
    </div>

    <transition name="expand">
      <div v-if="showMore" class="more-panel">
        <div
          v-for="item in moreCategories"
          :key="item.key"
          class="more-tag"
          :class="{ active: activeKey === item.key }"
          @click="handleClick(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const emit = defineEmits(['change'])

const activeKey = ref('featured')
const showMore = ref(false)

const categories = [
  { key: 'featured',   label: '精选' },
  { key: 'playlist',   label: '歌单广场' },
  { key: 'rank',       label: '排行榜' },
  { key: 'artist',     label: '歌手' },
  { key: 'vip',        label: 'VIP',        vip: true },
  { key: 'classic',    label: '经典' },
  { key: 'western',    label: '欧美' },
  { key: 'cantonese',  label: '粤语' },
  { key: 'driving',    label: '驾车' },
  { key: 'worldcup',   label: '世界杯' },
]

const moreCategories = [
  { key: 'japanese',   label: '日语' },
  { key: 'korean',     label: '韩语' },
  { key: 'electronic', label: '电子' },
  { key: 'hiphop',     label: '说唱' },
  { key: 'folk',       label: '民谣' },
  { key: 'rock',       label: '摇滚' },
  { key: 'rnb',        label: 'R&B' },
  { key: 'jazz',       label: '爵士' },
  { key: 'classical',  label: '古典' },
  { key: 'light',      label: '轻音乐' },
]

function handleClick(item) {
  activeKey.value = item.key
  emit('change', item)
}
</script>

<style scoped>
.category-nav {
  padding: 0 28px;
  user-select: none;
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  padding: 12px 0;
  scrollbar-width: none;
}
.nav-inner::-webkit-scrollbar {
  display: none;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.nav-item:hover {
  background: #F2F2F2;
  color: #333;
}

.nav-item.active {
  background: #FFF0F0;
  color: #EC4141;
  font-weight: 700;
}

.nav-item.active .nav-text {
  color: #EC4141;
}

.vip-tag {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #EC4141;
  border: 1px solid #EC4141;
  border-radius: 3px;
  padding: 0px 4px;
  line-height: 1.4;
  transform: scale(0.9);
}

.nav-item.active .vip-tag {
  background: #EC4141;
  color: #fff;
}

.nav-more {
  color: #999;
  gap: 2px;
  font-size: 12px;
}
.nav-more:hover {
  color: #666;
}

.more-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 0 16px;
  border-top: 1px solid #F0F0F0;
  margin-top: 4px;
}

.more-tag {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  background: #F9F9F9;
  transition: all 0.2s;
}
.more-tag:hover {
  background: #F2F2F2;
  color: #333;
}
.more-tag.active {
  background: #FFF0F0;
  color: #EC4141;
  font-weight: 700;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
