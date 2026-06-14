<template>
  <div class="nav-container w-full py-3">
    <div class="flex items-center gap-6">
      <div
        v-for="(item, index) in categories"
        :key="index"
        @click="activeIndex = index"
        class="px-4 py-1.5 text-base cursor-pointer transition-all duration-200 whitespace-nowrap select-none flex items-center"
        :class="[
          activeIndex === index
            ? 'bg-gray-200 text-gray-900 font-medium'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        ]"
        style="border-radius: 8px;"
      >
        {{ item }}
      </div>

      <div
        class="px-4 py-1.5 text-base cursor-pointer text-gray-500 hover:text-gray-900 flex items-center whitespace-nowrap"
        @click="handleMore"
      >
        更多
        <svg class="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
  '排行榜',
  '音乐播客',
  '精品播客',
  '情感',
  '有声书',
  '脱口秀'
])

const activeIndex = ref(0)

const handleMore = () => {
  console.log('点击更多')
}
</script>

<style scoped>
.nav-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  user-select: none;
}
</style>
