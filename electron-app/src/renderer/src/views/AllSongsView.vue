<template>
  <div class="flex flex-col gap-2" style="margin-left: 30px;">
    <!-- 标题区域 -->
    <div class="flex gap-4 justify-self-start">
      <div style="position: relative;">
        <el-image
          class="flex-shrink-0 rounded-sm w-[210px] h-[210px] object-cover shadow-lg"
          src="https://picsum.photos/210/210?random=1"
        />
        <div class="tips">
          <Icon icon="mdi:headphones" class="mr-[4px]"/>
          {{ formattedPlayCount }}
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-between gap-2 h-[210px]">
        <div class="text-xl font-bold">我的收藏</div>
        <div class="text-xs text-on-secondary">我喜欢的音乐合集</div>
        <div class="flex items-center gap-3 text-xs">
          <img class="user_img" src="https://picsum.photos/24/24?random=2" />
          <span>云音乐官方</span>
          <span class="text-on-secondary">2023-09-27创建</span>
        </div>
        <div class="flex items-center gap-3">
          <el-button type="primary" style="height: 40px;" @click="playAll">
            <Icon icon="mdi:play" class="text-xl mr-[5px]"></Icon>
            播放全部
          </el-button>
          <el-button type="info" style="height: 40px;">
            <Icon icon="mdi:heart-outline" class="text-xl mr-[5px]"></Icon>
            28
          </el-button>
          <el-button type="info" style="height: 40px;">
            <Icon icon="mdi:download" class="text-xl mr-[5px]"></Icon>
            下载
          </el-button>
        </div>
      </div>
    </div>

    <!-- 标签页 -->
    <div class="flex items-center gap-8 tabs">
      <div :class="{tabs_active: activeTab === 'song'}" @click="activeTab = 'song'">
        歌曲
        <div>{{ songs.length }}</div>
      </div>
      <div :class="{tabs_active: activeTab === 'comment'}" @click="activeTab = 'comment'">
        评论
        <div>0</div>
      </div>
      <div :class="{tabs_active: activeTab === 'collect'}" @click="activeTab = 'collect'">
        收藏者
        <div>0</div>
      </div>
    </div>

    <!-- 歌曲表格 -->
    <div v-if="activeTab === 'song'" class="song-table-wrapper">
      <table class="song-table" v-if="songs.length">
        <thead>
          <tr>
            <th class="col-index">#</th>
            <th class="col-title">歌曲</th>
            <th class="col-artist">歌手</th>
            <th class="col-album">专辑</th>
            <th class="col-duration">时长</th>
            <th class="col-likes">喜欢</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(song, index) in songs"
            :key="song.id"
            class="song-row"
            :class="{ 'is-playing': currentPlayingIndex === index }"
            @click="handleSongClick(song, index)"
          >
            <td class="col-index">{{ index + 1 }}</td>
            <td class="col-title">
              <div class="title-cell">
                <img v-if="song.cover" :src="song.cover" class="cover-sm" />
                <span class="song-name">{{ song.title }}</span>
              </div>
            </td>
            <td class="col-artist">{{ song.artist || '未知艺术家' }}</td>
            <td class="col-album">{{ song.album || '未知专辑' }}</td>
            <td class="col-duration">{{ formatTime(song.duration) }}</td>
            <td class="col-likes">{{ getLikes(index) }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-center text-gray-400 py-10">暂无歌曲</div>
    </div>

    <div v-if="activeTab === 'comment'" class="text-center text-gray-400 py-10">评论功能开发中</div>
    <div v-if="activeTab === 'collect'" class="text-center text-gray-400 py-10">收藏者功能开发中</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { request } from '../utils/request'
import { usePlayer } from '../composables/usePlayer'

const { play, currentIndex } = usePlayer()
const activeTab = ref('song')
const currentPlayingIndex = computed(() => currentIndex.value)
const songs = ref([])

const formattedPlayCount = computed(() => {
  const count = songs.value.length
  return count ? `${count}首` : '0首'
})

function formatTime(seconds) {
  if (!seconds) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function getLikes(index) {
  const base = (songs.value.length - index) * 1200 + Math.floor(Math.random() * 1000)
  if (base >= 100000) return (base / 10000).toFixed(1) + '万'
  return base.toLocaleString()
}

function handleSongClick(song, index) {
  play(songs.value, index)
}

function playAll() {
  if (songs.value.length) play(songs.value, 0)
}

async function fetchAllSongs() {
  try {
    const res = await request.get('/songs/all')
    const list = res.songs || res.data?.songs || []
    songs.value = list.map(song => ({
      ...song,
      album: song.album || '未知专辑'
    }))
  } catch (e) {
    console.error('获取全部歌曲失败:', e)
  }
}

onMounted(fetchAllSongs)
</script>

<style scoped>
.justify-self-start { justify-self: flex-start; }
.tips { position: absolute; top: 8px; right: 10px; color: white; font-size: 12px; font-weight: 500; background: rgba(0,0,0,0.6); padding: 3px 8px; border-radius: 4px; display: flex; align-items: center; }
.user_img { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(0,0,0,0.1); }
.tabs>div { position: relative; font-size: 16px; font-weight: 600; cursor: pointer; color: #858585; padding: 6px 0; }
.tabs>div>div { position: absolute; top: -6px; right: -28px; font-size: 12px !important; }
.tabs_active { color: #333; }
.tabs_active::before { content: ''; position: absolute; bottom: -5px; left: 0; height: 2px; width: 100%; background-color: red; }
.song-table-wrapper { margin-top: 16px; overflow-x: auto; }
.song-table { width: 100%; border-collapse: collapse; font-size: 14px; color: #333; }
.song-table thead th { text-align: left; padding: 8px 12px; color: #888; font-weight: 500; border-bottom: 2px solid #e5e5e5; white-space: nowrap; }
.col-index { width: 50px; text-align: center; }
.col-title { min-width: 200px; }
.col-artist { min-width: 120px; }
.col-album { min-width: 120px; }
.col-duration { width: 70px; text-align: center; }
.col-likes { width: 80px; text-align: center; }
.song-row { transition: background 0.2s; cursor: pointer; }
.song-row:hover { background: #f5f5f5; }
.song-row td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; }
.song-row.is-playing { background: #fff0f0; }
.song-row.is-playing .song-name { color: #ec4141; font-weight: 600; }
.title-cell { display: flex; align-items: center; gap: 10px; }
.cover-sm { width: 32px; height: 32px; border-radius: 4px; object-fit: cover; flex-shrink: 0; }
.song-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
