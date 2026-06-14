<!-- src/renderer/src/views/PlaylistDetail.vue -->
<template>
  <div class="flex flex-col gap-2" style="margin-left: 20px;">
    <div class="flex gap-4 justify-self-start">
      <div style="position: relative;">
        <el-image
          class="flex-shrink-0 rounded-sm w-[180px] h-[180px] object-cover shadow-lg"
          :src="playlistInfo.cover"
        />
        <div class="tips">
          <Icon icon="mdi:headphones" class="mr-[4px]"/>
          {{ formattedPlayCount }}
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-between gap-2 h-[180px]">
        <div class="text-xl font-bold">
          {{ playlistInfo.title }}
        </div>
        <div class="text-xs text-on-secondary">
          {{ playlistInfo.description }}
        </div>
        <div class="flex items-center gap-3 text-xs">
          <img class="user_img" :src="playlistInfo.creatorAvatar || 'https://picsum.photos/24/24?random=2'" />
          <span>{{ playlistInfo.creator || '云音乐官方' }}</span>
          <span class="text-on-secondary">{{ playlistInfo.createTime || '' }}</span>
        </div>
        <div class="flex items-center gap-3">
          <el-button type="primary" style="height: 40px;" @click="playAll">
            <Icon icon="mdi:play" class="text-xl mr-[5px]"></Icon>
            播放全部
          </el-button>
          <el-button type="info" style="height: 40px;" @click="collect">
            <Icon icon="mdi:heart-outline" class="text-xl mr-[5px]"></Icon>
            {{ playlistInfo.collectCount || 0 }}
          </el-button>
          <el-button type="info" style="height: 40px;">
            <Icon icon="mdi:download" class="text-xl mr-[5px]"></Icon>
            下载
          </el-button>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-8 tabs">
      <div
        :class="{tabs_active: activeTab === 'song'}"
        @click="activeTab = 'song'"
      >
        歌曲
        <div>{{ songs.length }}</div>
      </div>
      <div
        :class="{tabs_active: activeTab === 'comment'}"
        @click="activeTab = 'comment'"
      >
        评论
        <div>0</div>
      </div>
      <div
        :class="{tabs_active: activeTab === 'collect'}"
        @click="activeTab = 'collect'"
      >
        收藏者
        <div>0</div>
      </div>
    </div>

    <div v-if="activeTab === 'song'" class="song-table-wrapper">
      <table class="song-table">
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
            :class="{ 'is-playing': currentIndex === index }"
            @click="handleSongClick(song, index)"
          >
            <td class="col-index">{{ index + 1 }}</td>
            <td class="col-title">
              <div class="title-cell">
                <img
                  v-if="song.cover"
                  :src="song.cover"
                  class="cover-sm"
                />
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
      <div v-if="!songs.length" class="text-center text-gray-400 py-10">暂无歌曲</div>
    </div>

    <div v-if="activeTab === 'comment'" class="text-center text-gray-400 py-10">评论功能开发中</div>
    <div v-if="activeTab === 'collect'" class="text-center text-gray-400 py-10">收藏者功能开发中</div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { request } from '../utils/request'
import { Icon } from '@iconify/vue'
import { usePlayer } from '../composables/usePlayer'

const route = useRoute()
const activeTab = ref('song')
const { play, currentIndex } = usePlayer()

const playlistInfo = ref({
  id: null,
  title: '',
  cover: 'https://picsum.photos/210/210?random=1',
  description: '',
  creator: '',
  creatorAvatar: '',
  createTime: '',
  playCount: 0,
  collectCount: 0
})
const songs = ref([])

const formattedPlayCount = computed(() => {
  const count = playlistInfo.value.playCount || 0
  if (count >= 1e8) return (count / 1e8).toFixed(1) + '亿'
  if (count >= 1e7) return (count / 1e7).toFixed(1) + '千万'
  if (count >= 1e4) return (count / 1e4).toFixed(1) + '万'
  return count.toString()
})

function formatTime(seconds) {
  if (!seconds) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function getLikes(index) {
  const base = (songs.value.length - index) * 1200 + Math.floor(Math.random() * 1000)
  if (base >= 100000) return (base / 10000).toFixed(1) + '万'
  return base.toLocaleString()
}

async function fetchPlaylistDetail() {
  const id = route.params.id
  try {
    const res = await request.get(`/playlists/${id}/songs`)
    const data = res.songs || res.data?.songs || []
    songs.value = data.map(song => ({
      ...song,
      album: song.album || '未知专辑'
    }))

    const infoRes = await request.get(`/playlists/${id}`)
    const info = infoRes.playlist || infoRes.data?.playlist || {}
    if (info.title) {
      playlistInfo.value = {
        ...playlistInfo.value,
        id: info.id,
        title: info.title,
        cover: info.cover || playlistInfo.value.cover,
        description: info.description || '',
        creator: info.creator || '官方',
        creatorAvatar: info.creatorAvatar || '',
        createTime: info.createTime || '',
        playCount: info.play_count || info.playCount || 0,
        collectCount: info.collectCount || 0
      }
    }
  } catch (e) {
    console.error('获取歌单详情失败:', e)
  }
}

function playAll() {
  if (songs.value.length > 0) {
    play(songs.value, 0)
  }
}

function handleSongClick(song, index) {
  play(songs.value, index)
}

function collect() {
}

onMounted(fetchPlaylistDetail)
</script>

<style scoped>
.justify-self-start {
  justify-self: flex-start;
}
.tips {
  position: absolute;
  top: 8px;
  right: 10px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.6);
  padding: 3px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.user_img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.tabs>div{
  position: relative;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: #858585;
  padding: 6px 0;
}
.tabs>div>div{
  position: absolute;
  top: -6px;
  right: -28px;
  font-size: 12px !important;
}
.tabs_active{
  color: #333;
}
.tabs_active::before{
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: red;
}

.song-table-wrapper {
  margin-top: 16px;
  overflow-x: auto;
}

.song-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #333;
}

.song-table thead th {
  text-align: left;
  padding: 8px 12px;
  color: #888;
  font-weight: 500;
  border-bottom: 2px solid #e5e5e5;
  white-space: nowrap;
}

.col-index { width: 50px; text-align: center; }
.col-title { min-width: 200px; }
.col-artist { min-width: 120px; }
.col-album { min-width: 120px; }
.col-duration { width: 70px; text-align: center; }
.col-likes { width: 80px; text-align: center; }

.song-row {
  transition: background 0.2s;
  cursor: pointer;
}
.song-row:hover {
  background: #f5f5f5;
}
.song-row td {
  padding: 10px 12px;
  border-bottom: 1px solid #f0f0f0;
}

.song-row.is-playing {
  background: #fff0f0;
}
.song-row.is-playing .song-name {
  color: #ec4141;
  font-weight: 600;
}

.title-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cover-sm {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
}
.song-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
