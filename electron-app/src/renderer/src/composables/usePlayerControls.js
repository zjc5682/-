import { ref, computed } from 'vue'

export function usePlayerControls() {
  const topBarHeight = computed(() => '104px')
  const bottomMusicPlayerHeight = computed(() => '6.6rem')
  const contentHeight = computed(() => {
    return `calc(100vh - ${topBarHeight.value} - 4rem - ${bottomMusicPlayerHeight.value})`
  })
  return { contentHeight, topBarHeight }
}
