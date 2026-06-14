import { ref } from 'vue'
import { request } from '../utils/request'

const playlist = ref([])
const currentIndex = ref(-1)
const currentSong = ref(null)
const isPlaying = ref(false)

function recordPlay(song) {
  if (!song) return
  request.post('/history/add', { song: {
    id: song.id,
    title: song.title,
    artist: song.artist,
    url: song.url,
    cover: song.cover || ''
  }}).catch(() => {})
}

export function usePlayer() {
  function play(songs, index = 0) {
    console.log('usePlayer.play 被调用, 列表长度:', songs?.length, '索引:', index)
    if (!songs || songs.length === 0) return
    playlist.value = songs
    currentIndex.value = index
    currentSong.value = songs[index]
    isPlaying.value = true
    console.log('当前歌曲已设置为:', currentSong.value?.title, 'isPlaying:', isPlaying.value)
    recordPlay(songs[index])
  }

  function next() {
    if (playlist.value.length === 0) return
    if (currentIndex.value < playlist.value.length - 1) {
      currentIndex.value++
    } else {
      currentIndex.value = 0
    }
    currentSong.value = playlist.value[currentIndex.value]
    isPlaying.value = true
    recordPlay(currentSong.value)
  }

  function previous() {
    if (playlist.value.length === 0) return
    if (currentIndex.value > 0) {
      currentIndex.value--
    } else {
      currentIndex.value = playlist.value.length - 1
    }
    currentSong.value = playlist.value[currentIndex.value]
    isPlaying.value = true
    recordPlay(currentSong.value)
  }

  function toggle() {
    isPlaying.value = !isPlaying.value
  }

  function playSong(song) {
    if (!song) return
    const index = playlist.value.findIndex(s => s.url === song.url)
    if (index !== -1) {
      currentIndex.value = index
      currentSong.value = song
      isPlaying.value = true
    } else {
      playlist.value = [song]
      currentIndex.value = 0
      currentSong.value = song
      isPlaying.value = true
    }
    recordPlay(song)
  }

  return {
    playlist,
    currentIndex,
    currentSong,
    isPlaying,
    play,
    next,
    previous,
    toggle,
    playSong
  }
}
