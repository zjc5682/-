<template>
    <div>
        <ItemMainMenu 
        v-for="item in mainMenus" 
        :key="item.route" 
        :data="item" 
        :is-active="isMenuActive(item.route)"
        @click="handleMenuClick(item)"
        />
          <el-divider style="margin: 10px 0;" />
        <ItemMainMenu
         v-for="item in otherMenus" 
        :key="item.route" 
        :data="item" 
        :is-active="isMenuActive(item.route)"
        @click="handleMenuClick(item)"
    />
    </div>


</template>
<script setup>


import { useMainMenu } from '../composables/useMainMenu';

import ItemMainMenu from './ItemMainMenu.vue';

const { mainMenus,otherMenus, isMenuActive, handleMenuClick } = useMainMenu();

</script>
<style scoped></style>
