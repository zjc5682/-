<template>
  <div class="official-playlist">
    <div class="section-header">
      <span class="title">官方歌单</span>
      <svg class="arrow-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
      </svg>
    </div>

    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="skeleton-grid">
          <div v-for="n in 4" :key="n" class="skeleton-item">
            <el-skeleton-item variant="image" class="skeleton-img" />
            <el-skeleton-item variant="p" class="skeleton-text" />
          </div>
        </div>
      </template>
      <template #default>
        <div v-if="playlists.length" class="playlist-grid">
          <div
            v-for="item in playlists"
            :key="item.id"
            class="playlist-card"
            @click="goDetail(item)"
          >
            <div class="card-cover">
              <img :src="item.coverUrl" class="cover-image" />
              <img
                src="http://localhost:3000/static/images/banners/assets/播放.png"
                class="play-icon"
              />
              <div class="play-count" v-if="item.playCount">
                <svg class="count-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {{ item.playCount }}
              </div>
            </div>
            <div class="card-title">{{ item.title }}</div>
          </div>
        </div>
        <div v-else class="empty-text">暂无官方歌单</div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { request } from '../utils/request'   // ✅ 正确  // 根据实际路径调整

const router = useRouter()
const playlists = ref([])
const loading = ref(true)

// 格式化播放量
function formatCount(n) {
  if (!n) return ''
  if (n >= 1e8) return (n / 1e8).toFixed(1) + '亿'
  if (n >= 1e7) return (n / 1e7).toFixed(1) + '千万'
  if (n >= 1e4) return (n / 1e4).toFixed(1) + '万'
  return String(n)
}

// 获取官方歌单（只取前 4 个）
async function fetchPlaylists() {
  loading.value = true
  try {
    const res = await request.get('/playlists/official')
    // 根据你现在的返回结构，取 res.data.playlists
    const list = res.data?.playlists || res.playlists || []
    playlists.value = list.map(item => ({
      id: item.id,           // 现在有 id 了
      coverUrl: item.cover || item.icon,
      title: item.title,
      playCount: formatCount(item.play_count || item.playCount || 0)
    }))
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

// 跳转歌单详情页
function goDetail(item) {
  console.log('跳转歌单ID:', item.id)   // 应该打印出数字
  router.push({ name: 'sheetDetail', params: { id: item.id } })
}

onMounted(fetchPlaylists)
</script>

<style scoped>
.official-playlist {
  margin-top: 10px;
  margin-left: 20px;
  padding-right: 20px; 
}

.section-header {
  display: flex;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 12px;
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

/* 网格：固定 4 列 */
.playlist-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* 骨架屏网格同样 4 列 */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.playlist-card {
  cursor: pointer;
}
.card-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  background: #eee;
}
.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 5;
  pointer-events: none;
}
.card-cover:hover .play-icon {
  opacity: 1;
}
.play-count {
  position: absolute;
  bottom: 6px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: #fff;
  background: rgba(0,0,0,0.5);
  padding: 2px 8px;
  border-radius: 10px;
  transition: opacity 0.3s;
}
.playlist-card:hover .play-count {
  opacity: 0;
}
.count-icon {
  width: 12px;
  height: 12px;
  fill: #fff;
}
.card-title {
  font-size: 13px;
  margin-top: 6px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #333;
}

.skeleton-item {
  display: flex;
  flex-direction: column;
}
.skeleton-img {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
}
.skeleton-text {
  height: 16px;
  width: 60%;
  margin-top: 8px;
  border-radius: 4px;
}
.empty-text {
  text-align: center;
  color: #999;
  padding: 40px;
}
</style>