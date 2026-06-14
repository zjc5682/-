<template>
  <div
    class="player-container"
    :style="{ height: props.height, flexShrink: 0 }"
  >
    <div class="progress-bar-wrapper">
      <span class="time-label">{{ formatTime(currentTime) }}</span>
      <el-slider
        v-model="sliderValue"
        :min="0"
        :max="duration"
        :step="1"
        size="small"
        class="progress-slider"
        :format-tooltip="formatTime"
        @input="onProgressInput"
        @change="onProgressChange"
      />
      <span class="time-label">{{ formatTime(duration) }}</span>
    </div>

    <div class="controls-area">
      <div v-if="currentSong" class="song-info">
        <img
          :src="currentSong.cover || 'https://picsum.photos/80/80?random=99'"
          class="cover-img"
        />
        <div class="song-text">
          <div class="song-title">{{ currentSong.title }}</div>
          <div class="song-artist">{{ currentSong.artist }}</div>
        </div>
      </div>
      <div v-else class="song-info placeholder">
        暂无播放歌曲
      </div>
      <div v-if="errorCount > 0" class="skip-hint">无会员，正在自动切换歌曲…</div>

      <div class="control-buttons">
        <button class="ctrl-btn skip-btn" title="后退10秒" @click="seekBackward">
          <img
            :src="skipBackwardSrc"
            alt="后退10秒"
            class="skip-icon"
            @mouseenter="skipBackwardHover = true"
            @mouseleave="skipBackwardHover = false"
          />
        </button>

        <button class="ctrl-btn" title="上一首" @click="prevSong">
          <svg viewBox="0 0 24 24" class="icon">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/>
          </svg>
        </button>

        <button class="ctrl-btn play-btn" title="播放/暂停" @click="togglePlay">
          <svg v-if="isPlaying" viewBox="0 0 24 24" class="icon">
            <path d="M6 19h4V5H6zm8-14v14h4V5h-4z" fill="currentColor"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" class="icon">
            <path d="M8 5v14l11-7z" fill="currentColor"/>
          </svg>
        </button>

        <button class="ctrl-btn" title="下一首" @click="nextSong">
          <svg viewBox="0 0 24 24" class="icon">
            <path d="M6 18l8.5-6L6 6zm10-12v12h2V6z" fill="currentColor"/>
          </svg>
        </button>

        <button class="ctrl-btn skip-btn" title="前进10秒" @click="seekForward">
          <img
            :src="skipForwardSrc"
            alt="前进10秒"
            class="skip-icon"
            @mouseenter="skipForwardHover = true"
            @mouseleave="skipForwardHover = false"
          />
        </button>
      </div>

      <div class="volume-control" ref="volumeContainer">
        <button class="ctrl-btn volume-btn" title="音量" @click="toggleVolumePanel">
          <svg viewBox="0 0 24 24" class="icon" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-.77-3.36-2-4.46v8.92c1.23-1.1 2-2.69 2-4.46zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </button>
        <div v-if="showVolumePanel" class="volume-popup">
          <el-slider
            v-model="volume"
            vertical
            :min="0"
            :max="100"
            height="120px"
            @input="onVolumeChange"
          />
        </div>
      </div>
    </div>

    <audio
      ref="audioRef"
      :src="currentSong?.url"
      @error="onAudioError"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onSongEnd"
      @play="onPlay"
      @pause="onPause"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import { usePlayer } from '../composables/usePlayer'

const props = defineProps({
  height: {
    type: String,
    default: '6.6rem'
  }
})

const {
  currentSong,
  isPlaying,
  next,
  previous,
  toggle
} = usePlayer()

const nextSong = next
const prevSong = previous

const audioRef = ref(null)
const volume = ref(60)
const showVolumePanel = ref(false)
const volumeContainer = ref(null)

const currentTime = ref(0)
const duration = ref(0)
const sliderValue = ref(0)
const isDragging = ref(false)

const basePath = 'http://localhost:3000/static/images/banners'

const skipBackwardHover = ref(false)
const skipForwardHover = ref(false)

const skipBackwardSrc = computed(() => {
  if (skipBackwardHover.value) return `${basePath}/后退 (1).png`
  return `${basePath}/后退.png`
})
const skipForwardSrc = computed(() => {
  if (skipForwardHover.value) return `${basePath}/前进.png`
  return `${basePath}/前进 (1).png`
})

function onVolumeChange(val) {
  if (audioRef.value) {
    audioRef.value.volume = val / 100
  }
}

function seekForward() {
  if (!audioRef.value) return
  audioRef.value.currentTime = Math.min(audioRef.value.duration || 0, audioRef.value.currentTime + 10)
}
function seekBackward() {
  if (!audioRef.value) return
  audioRef.value.currentTime = Math.max(0, audioRef.value.currentTime - 10)
}

function toggleVolumePanel() {
  showVolumePanel.value = !showVolumePanel.value
}

function handleClickOutside(e) {
  if (volumeContainer.value && !volumeContainer.value.contains(e.target)) {
    showVolumePanel.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function onProgressInput(val) {
  isDragging.value = true
  currentTime.value = val
}
function onProgressChange(val) {
  if (audioRef.value) {
    audioRef.value.currentTime = val
  }
  isDragging.value = false
}

function onTimeUpdate() {
  if (!isDragging.value && audioRef.value) {
    currentTime.value = audioRef.value.currentTime
    sliderValue.value = audioRef.value.currentTime
  }
}
function onLoadedMetadata() {
  if (audioRef.value) {
    duration.value = audioRef.value.duration || 0
  }
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00'
  const totalSec = Math.floor(seconds)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

watch(isPlaying, (playing) => {
  if (!audioRef.value) return
  if (playing) {
    if (audioRef.value.src && audioRef.value.paused) {
      audioRef.value.play().catch(() => {})
    }
  } else {
    audioRef.value.pause()
  }
})

watch(currentSong, (newSong) => {
  if (!newSong || !newSong.url) {
    console.warn('当前歌曲无有效 URL，跳过播放')
    return
  }
  if (!audioRef.value) return

  audioRef.value.pause()
  audioRef.value.src = ''
  audioRef.value.load()

  audioRef.value.src = newSong.url
  audioRef.value.load()

  const onCanPlay = () => {
    if (isPlaying.value) {
      audioRef.value.play().catch(err => {
        console.warn('自动播放被阻止，请手动点击播放:', err)
      })
    }
    audioRef.value.removeEventListener('canplay', onCanPlay)
  }

  audioRef.value.addEventListener('canplay', onCanPlay)

  setTimeout(() => {
    if (isPlaying.value && audioRef.value.paused) {
      audioRef.value.play().catch(() => {})
    }
  }, 1000)
})

function togglePlay() {
  toggle()
}

const errorCount = ref(0)
const MAX_ERRORS = 10

function onAudioError(event) {
  const audio = event.target
  console.error('音频播放失败:', audio?.src, audio?.error?.message)

  errorCount.value++

  if (errorCount.value >= MAX_ERRORS) {
    console.warn('连续播放失败，已停止自动切换')
    isPlaying.value = false
    currentSong.value = null
    return
  }

  nextSong()
}

function onSongEnd() {
  nextSong()
}
function onPlay() {
  errorCount.value = 0
  isPlaying.value = true
}
function onPause() {
  isPlaying.value = false
}
</script>

<style scoped>
.player-container {
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e0e0e0;
  user-select: none;
}

.progress-bar-wrapper {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 28px;
  background: #fff;
}
.time-label {
  font-size: 11px;
  color: #888;
  width: 36px;
  text-align: center;
}
.progress-slider {
  flex: 1;
  margin: 0 8px;
}
:deep(.progress-slider .el-slider__bar) {
  background-color: #ec4141 !important;
}
:deep(.progress-slider .el-slider__button) {
  border-color: #ec4141 !important;
}

.controls-area {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1;
}

.song-info {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 220px;
}
.cover-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.song-title {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song-artist {
  font-size: 11px;
  color: #999;
}
.placeholder {
  color: #aaa;
  font-size: 13px;
}
.skip-hint {
  position: absolute;
  left: 240px;
  top: 50%;
  transform: translateY(-50%);
  color: #f56c6c;
  font-size: 12px;
  white-space: nowrap;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}
.ctrl-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: color 0.2s;
}
.ctrl-btn:hover {
  color: #ec4141;
}
.icon {
  width: 24px;
  height: 24px;
}
.play-btn .icon {
  width: 32px;
  height: 32px;
}
.btn-label {
  position: absolute;
  font-size: 10px;
  font-weight: 700;
  bottom: -2px;
  right: -2px;
  background: #ec4141;
  color: #fff;
  border-radius: 2px;
  padding: 0 2px;
  line-height: 1.2;
}

.skip-btn {
  width: 30px;
  height: 30px;
  padding: 0;
}
.skip-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.volume-control {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.volume-btn .icon {
  width: 22px;
  height: 22px;
}
.volume-popup {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 12px 8px;
  z-index: 10;
}
:deep(.volume-popup .el-slider) {
  height: 120px;
}
</style>
