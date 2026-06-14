<template>
  <div class="discover-page">
    <CategoryNav @change="onCategoryChange" />
    <div class="content-area">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CategoryNav from '../components/CategoryNav.vue'

const router = useRouter()
const activeCategory = ref('featured')

function onCategoryChange(item) {
  activeCategory.value = item.key
  console.log('切换分类:', item.key, item.label)
}
</script>

<style scoped>
.discover-page {
  padding: 0 28px 48px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-area {
  margin-top: 8px;
}
</style>
