<template>
  <div class="blog-page">
    <div class="carousels-row">
      <PoetryFM />
      <div class="carousel-card gray-card">
        <el-carousel
          :interval="5000"
          arrow="hover"
          indicator-position="none"
          height="100%"
        >
          <el-carousel-item v-for="item in grayBanners" :key="item.id">
            <div class="flex items-center justify-between h-full px-3">
              <div class="text-white z-10 max-w-[65%]">
                <h3 class="text-base font-bold mb-1 line-clamp-1">{{ item.title }}</h3>
                <p class="text-xs opacity-80 line-clamp-2">{{ item.description }}</p>
                <button class="mt-2 px-3 py-0.5 bg-white/20 backdrop-blur rounded-full text-xs hover:bg-white/30 transition">
                  立即收听
                </button>
              </div>
              <div class="w-14 h-14 rounded-lg overflow-hidden shadow-md flex-shrink-0 ml-3">
                <img :src="item.cover" class="w-full h-full object-cover" />
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <BlogCategoryNav />

    <GuessYouLike />
  </div>
</template>

<script setup>
import PoetryFM from '../components/PoetryFM.vue'
import BlogCategoryNav from '../components/BlogCategoryNav.vue'
import GuessYouLike from '../components/GuessYouLike.vue'
import { ref } from 'vue'

const grayBanners = ref([
  { id: 1, title: '治愈系钢琴', description: '安静午后的陪伴', cover: 'https://picsum.photos/200/200?random=11' },
  { id: 2, title: '电子幻想', description: '未来感十足的电音', cover: 'https://picsum.photos/200/200?random=12' },
  { id: 3, title: '爵士午后', description: '慵懒的咖啡时光', cover: 'https://picsum.photos/200/200?random=13' }
])
</script>

<style scoped>
.blog-page {
  padding: 20px 28px;
  max-width: 1100px;
  margin: 0 auto;
  min-height: 100%;
  background: inherit;
}

.carousels-row {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  min-height: 160px;
}

.carousel-card {
  flex: 1;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  color: #fff;
}

.gray-card {
  background: linear-gradient(135deg, #9db5a8, #6d8a80);
  padding: 12px 16px 8px;
}

:deep(.el-carousel) {
  height: 100%;
}
:deep(.el-carousel__container) {
  height: 100% !important;
}
:deep(.el-carousel__item) {
  height: 100% !important;
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
.gray-card :deep(.el-carousel__arrow--left) {
  left: 10px !important;
}
.gray-card :deep(.el-carousel__arrow--right) {
  right: 10px !important;
}
</style>
