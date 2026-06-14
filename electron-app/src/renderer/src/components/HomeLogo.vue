<template>
    <div class="logo-container flex flex-col items-center justify-center drag-regin flex-shrink-0">
        <img  :src="isDark ? '/src/assets/images/dark-logo.png' : '/src/assets/images/logo.png'"
         class="logo no-drag cursor-pointer" 
         @click="logoClick" />
    </div>
</template>
<script setup>
const logoClick = () => {
    console.log('HomeLogo logoClick')
}


import { useTheme } from '../composables/useTheme'
const { isDark } = useTheme()

</script>
<style scoped>
.logo-container {
    height: 6rem;
}

.logo {
    height: 42px;
}
</style>