<template>
  <div class="latest-songs">
    
    <div class="section-header">
      <span class="title">最新歌曲</span>
      <svg class="arrow-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
      </svg>
    </div>

    <div class="songs-grid">
      <div
        v-for="(song, index) in songs"
        :key="song.id"
        class="song-card"
        @click="handleSongClick(song, index)"
      >
        <img
          :src="song.cover || 'https://picsum.photos/80/80?random=' + index"
          class="song-cover"
        />
        <div class="song-info">
          <div class="song-title">{{ song.title }}</div>
          <div class="song-artist">{{ song.artist || '未知艺术家' }}</div>
        </div>
        <div class="song-actions">
          <span class="song-duration">{{ formatTime(song.duration) }}</span>
          <button class="play-btn" @click.stop="handleSongClick(song, index)">
            <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-if="!songs.length" class="empty-text">暂无最新歌曲</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../utils/request'
import { usePlayer } from '../composables/usePlayer'

const { play } = usePlayer()
const songs = ref([])
const loading = ref(true)

function formatTime(seconds) {
  if (!seconds) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

async function fetchLatestSongs() {
  loading.value = true
  try {
    const res = await request.get('/songs/latest', { params: { limit: 10 } })
    console.log('最新歌曲 res:', res)
    let list = res?.songs || res?.data?.songs || res
    if (!Array.isArray(list)) {
      list = [list]
    }
    songs.value = list.map(song => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      url: song.url,
      duration: song.duration,
      cover: song.cover || song.albumCover || ''
    }))
  } catch (e) {
    console.error('获取最新歌曲失败:', e)
  } finally {
    loading.value = false
  }
}

function handleSongClick(song, index) {
  play(songs.value, index)
}

onMounted(fetchLatestSongs)
</script>

<style scoped>
.latest-songs {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  max-height: 400px;
  overflow-y: auto;
}
.latest-songs::-webkit-scrollbar {
  display: none;
}
.latest-songs {
  scrollbar-width: none;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 16px;
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

.songs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.song-card {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background: #fafafa;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  min-width: 0;
}
.song-card:hover {
  background: #f0f0f0;
  transform: translateY(-1px);
}

.song-cover {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 12px;
}

.song-info {
  flex: 1;
  min-width: 0;
}
.song-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song-artist {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
  flex-shrink: 0;
}
.song-duration {
  font-size: 12px;
  color: #999;
}
.play-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
}
.play-btn:hover {
  color: #EC4141;
}
.play-icon {
  width: 18px;
  height: 18px;
}

.empty-text {
  text-align: center;
  color: #999;
  padding: 30px 0;
}
</style>
