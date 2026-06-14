<template>
  <div class="song-list-container w-full max-w-5xl p-4 text-sm text-gray-800 dark:text-gray-200">
    
    <!-- 顶部区域：标签 + 操作按钮 -->
    <div class="flex justify-between items-center mb-4">
      <!-- 左侧标签 -->
      <div class="flex items-center gap-6">
        <div 
          v-for="(tab, index) in tabs" 
          :key="index"
          class="cursor-pointer pb-1 transition-colors"
          :class="activeTab === index ? 'text-red-500 font-medium border-b-2 border-red-500' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'"
        >
          {{ tab.name }}
          <span class="text-xs text-gray-400 ml-0.5">{{ tab.count }}</span>
        </div>
      </div>

      <!-- 右侧播放全部按钮 -->
      <button 
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
        @click="playAll"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        播放全部
      </button>
    </div>

    <!-- 列表表头 -->
    <div class="grid grid-cols-12 gap-2 px-2 py-2 text-xs text-gray-500 border-b border-gray-200 dark:border-gray-700">
      <div class="col-span-1 text-center">#</div>
      <div class="col-span-5">音乐标题</div>
      <div class="col-span-3">歌手</div>
      <div class="col-span-2">专辑</div>
      <div class="col-span-1 text-center">时长</div>
    </div>

    <!-- 歌曲列表 -->
    <div class="song-list-body">
      <div 
        v-for="(song, index) in songs" 
        :key="song.id" 
        class="grid grid-cols-12 gap-2 items-center px-2 py-2 rounded-md group hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        @click="playSong(song)"
      >
        <!-- 序号 / 播放状态 -->
        <div class="col-span-1 text-center text-gray-400 font-medium">
          <span class="group-hover:hidden">{{ index + 1 }}</span>
          <!-- 悬停时显示播放图标 -->
          <svg class="w-4 h-4 hidden group-hover:block mx-auto text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>

        <!-- 标题 + 操作图标 -->
        <div class="col-span-5 flex items-center gap-3 overflow-hidden">
          <!-- 封面 (图片中未显示封面，但为了美观可以加，这里保持纯净文字) -->
          <div class="flex flex-col overflow-hidden">
            <span class="truncate text-gray-900 dark:text-white font-medium">{{ song.title }}</span>
            <!-- 如果有副标题可以放在这里 -->
          </div>
          <!-- 喜欢/下载图标 (常驻或悬停显示，图片中是常驻灰色) -->
          <div class="flex items-center gap-2 text-gray-400">
             <svg class="w-4 h-4 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>
             <svg class="w-4 h-4 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
             </svg>
          </div>
        </div>

        <!-- 歌手 -->
        <div class="col-span-3 truncate text-gray-600 dark:text-gray-400">
          {{ song.artist }}
        </div>

        <!-- 专辑 -->
        <div class="col-span-2 truncate text-gray-500 dark:text-gray-500">
          {{ song.album }}
        </div>

        <!-- 时长 -->
        <div class="col-span-1 text-center text-gray-400 text-xs">
          {{ song.duration }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { request } from '../utils/request'
import { usePlayer } from '../composables/usePlayer'

const { play } = usePlayer()

const tabs = ref([
  { name: '最近播放', count: 0 }
])
const activeTab = ref(0)

const songs = ref([])

function formatDuration(sec) {
  if (!sec) return '--:--'
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

async function fetchHistory() {
  try {
    const res = await request.get('/history/recent')
    console.log('最近播放原始返回:', res)

    let list = res?.history || res?.data?.history || res?.data || res
    if (!Array.isArray(list)) list = [list]
    console.log('解析后的数组:', list)

    songs.value = list.map(item => ({
      id: item.song_id,
      title: item.title,
      artist: item.artist || '未知歌手',
      album: item.album || '未知专辑',
      duration: formatDuration(item.duration),
      url: item.url,
      cover: item.cover
    }))
    tabs.value[0].count = songs.value.length
  } catch (e) {
    console.error('获取最近播放失败', e)
  }
}

let intervalId = null

onMounted(() => {
  fetchHistory()
  intervalId = setInterval(fetchHistory, 2000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})

const playAll = () => {
  if (songs.value.length) play(songs.value, 0)
}

const playSong = (song) => {
  const index = songs.value.findIndex(s => s.id === song.id)
  play(songs.value, index >= 0 ? index : 0)
}
</script>

<style scoped>
.song-list-body::-webkit-scrollbar {
  width: 4px;
}
.song-list-body::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}
</style>