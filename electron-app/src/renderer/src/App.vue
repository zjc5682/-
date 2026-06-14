<template>
  <div class="flex flex-col" style="height: 100vh;">
    <div class="w-full flex" :style="{ height: `calc(100vh - ${bottomMusicPlayerHight})`, overflow: 'hidden' }">
      <LeftPanel/>
      <RightPanel/>
    </div>
    <BottomPlayer :height="bottomMusicPlayerHight" />
  </div>
</template>
<script setup>
import { ref ,onMounted} from 'vue';
import LeftPanel from './components/LeftPanel.vue';
import RightPanel from './components/RightPanel.vue';
import BottomPlayer from './components/BottomPlayer.vue';
import { initLanguage } from './utils/language';


const bottomMusicPlayerHight=ref('6.6rem')

onMounted(() => {
  initLanguage()
})
</script>