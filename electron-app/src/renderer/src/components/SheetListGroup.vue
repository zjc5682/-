<template>
  <el-divider style="margin: 10px 0;" />
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between text-outline">
      <div class="flex items-center gap-1 text-xs font-bold">
        <span>创建的歌单</span>
        <span>（{{ sheetList.length }}）</span>
      </div>
      <el-icon class="cursor-pointer">
        <CirclePlus />
      </el-icon>
    </div>

    <SheetListItem
      v-for="item in sheetList"
      :key="item.id"
      :data="item"
      :selected="selected(item.id)"
      @click="itemClick(item)"
    />
  </div>
</template>

<script setup>
import { CirclePlus } from '@element-plus/icons-vue';
import SheetListItem from './SheetListItem.vue';
import { useSheetListGroup } from '../composables/useSheetListGroup';

// ✅ 这里必须解构三个！！！
const { sheetList, selected, itemClick } = useSheetListGroup();
</script>

<style scoped>
</style>