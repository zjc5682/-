<template>
  <div class="selected-page">
    <CategoryNav />
    <!-- <CategoryNav @change="onCategoryChange" /> -->
    <RecommendLineView :banner-datum="bannerList" class="mb-4" />
    <OfficialPlaylist @item-click="handlePlaylistClick" />
    <LatestSongs />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RecommendLineView from '../components/RecommendLineView.vue'
import OfficialPlaylist from '../components/OfficialPlaylist.vue'
import LatestSongs from '../components/LatestSongs.vue'
import { request } from '../utils/request'
import CategoryNav from '../components/CategoryNav.vue'
const bannerList = ref([])

onMounted(async () => {
  try {
    const res = await request.get('/banners')
    bannerList.value = res.banners || []
  } catch (e) {
    console.error('获取轮播图失败', e)
  }
})

function handlePlaylistClick(item) {
  console.log('点击歌单:', item)
}
</script>
