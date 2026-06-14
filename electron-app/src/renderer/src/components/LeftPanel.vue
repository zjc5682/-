
<template>
    <div class="w-[205px] h-full flex flex-col bg-slide-background dark:bg-dark-slide-background">
        <HomeLogo></HomeLogo>
        <!-- 左侧菜单 --> <!-- 将原来的div换成Element Plus 中的 滚动区域组件 -->
        <el-scrollbar class="flex-1 px-5 pd-5">
      <MainMenu/>
      <SheetListGroup/>
    </el-scrollbar>

    </div>
</template>
<script setup>
import HomeLogo from './HomeLogo.vue';
import MainMenu from './MainMenu.vue';
import SheetListGroup from './SheetListGroup.vue';  
</script>