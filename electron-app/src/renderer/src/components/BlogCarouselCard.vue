<template>
  <div
    class="rounded-xl overflow-hidden relative"
    :style="{ height: height, background: gradientStyle, boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }"
  >
    <el-carousel
      :interval="4000"
      arrow="hover"
      indicator-position="none"
      height="100%"
      class="h-full"
    >
      <el-carousel-item v-for="item in sheetList" :key="item.id">
        <div class="flex items-center justify-between h-full px-3">
          <div class="text-white z-10 max-w-[65%]">
            <h3 class="text-base font-bold mb-1 line-clamp-1">{{ item.title }}</h3>
            <p class="text-xs opacity-80 line-clamp-2">
              {{ item.description || '精彩歌单推荐' }}
            </p>
            <button
              class="mt-2 px-3 py-0.5 bg-white/20 backdrop-blur rounded-full text-xs hover:bg-white/30 transition"
              @click.stop="goDetail(item)"
            >
              {{ $t('blog.listenNow') }}
            </button>
          </div>
          <div class="w-14 h-14 rounded-lg overflow-hidden shadow-md flex-shrink-0 ml-3">
            <img :src="item.coverImgUrl" alt="cover" class="w-full h-full object-cover" />
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  sheetList: { type: Array, default: () => [] },
  gradientType: { type: String, default: 'green' },
  height: { type: String, default: '180px' }
})

const router = useRouter()

const gradientStyle = computed(() => {
  return props.gradientType === 'green'
    ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    : 'linear-gradient(135deg, #3a3a3a 0%, #7a7a7a 100%)'
})

const goDetail = (item) => {
  router.push(`/playlist/${item.id}`)
}
</script>
