<!-- SheetListItem.vue -->
<template>
  <div 
    class="flex items-center gap-2 p-2 cursor-pointer rounded-md"
    :class="selected 
      ? 'bg-primary text-white' 
      : 'text-on-secondary hover:bg-hover dark:text-dark-on-surface dark:hover:bg-dark-hover'"
  >
    <el-image 
      :src="data.icon"
      class="sheet_list_img rounded-sm flex-shrink-0"
    />
    <div class="flex-1 leading-snug line-clamp-2 text-xs">
      {{ data.title }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
  selected: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.sheet_list_img{
  width: 33px;
  aspect-ratio: 1;
  object-fit: cover;
}
</style>