
<template>
    <div class="flex flex-col bg-slide-right-background dark:bg-[#282830]" :style="{ width: `calc(100vw - 205px)`, height: '100%' }">
        <TopBar />
        <div class="content-wrapper" style="flex: 1; overflow-y: auto;">
            <RouterView />
        </div>
    </div>
</template>


<script setup>
import TopBar from './TopBar.vue';
</script>