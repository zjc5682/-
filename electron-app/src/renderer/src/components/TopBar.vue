<!-- TopBar.vue -->
<template>
    <div class="flex justify-between items-center drag-regin p-7 px-10">
        <div class="flex items-center gap-3 no-drag">
            <div class="top_btn_l cursor-pointer" @click="goBack">
                <Icon icon="mingcute:left-line" class="text-xl"></Icon>
            </div>
            <div class="_input">
                <div class="flex items-center">
                   <Icon icon="mynaui:search"
                   class="text-xl text-on-secondary ml-2 mr-2"></Icon>
                    <input type="text" class="input_"
                        placeholder="大家都在搜："

                </div>
            </div>
            <div class="top_btn_r cursor-pointer">
                <Icon icon="si:mic-line" class="text-xl"></Icon>
            </div>
        </div>
        <div class="flex items-center gap-3 no-drag">
            <div class="flex gap-2 text-sm text-on-secondary no-drag items-center  dark:text-dark-on-secondary">
                <div class="bg-[#eaedf1] p-1" style="border-radius: 50%;">
                    <Icon icon="iconoir:user" class="text-xl"></Icon>
                </div>
                未登录
                <VipLevel :flag="true" level="柒"/> 
                <!--VipLevel/ -->
            </div>
            <Icon icon="si:mail-line" class="text-xl text-on-secondary cursor-pointer no-drag hover:text-black:text-dark-on-secondary dark:hover:text-dark-on-surface"></Icon>
            <Icon icon="lets-icons:setting-alt-line" @click="openSettingView"
                class="text-xl text-on-secondary cursor-pointer no-drag hover:text-black:text-dark-on-secondary dark:hover:text-dark-on-surface" ></Icon>
            <Icon icon="fluent:minimize-12-regular" @click="handleMinimize" class="text-xl text-on-secondary cursor-pointer no-drag hover:text-black:text-dark-on-secondary dark:hover:text-dark-on-surface"></Icon>
            <Icon icon="fluent:maximize-20-regular" @click="handleMaximize" class="text-xl text-on-secondary cursor-pointer no-drag hover:text-black:text-dark-on-secondary dark:hover:text-dark-on-surface"></Icon>
            <Icon icon="material-symbols:close-rounded" @click="handleClose" class="text-xl text-on-secondary cursor-pointer no-drag hover:text-black:text-dark-on-secondary dark:hover:text-dark-on-surface"></Icon>
        </div>
    </div>
</template>
<script setup>

import VipLevel from './vip.level/VipLevel.vue'
import { useTopBar } from '../composables/useTopBar'
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const{msg_size,openSettingView}=useTopBar();

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ name: 'Selected' })
  }
}

function handleMinimize() {
  if (window.api?.windowMinimize) {
    window.api.windowMinimize()
  } else {
    window.close()
  }
}
function handleMaximize() {
  if (window.api?.windowMaximize) {
    window.api.windowMaximize()
  } else {
    window.close()
  }
}
function handleClose() {
  if (window.api?.windowClose) {
    window.api.windowClose()
  } else {
    window.close()
  }
}



</script>
<style scoped>
.top_btn_l {
    border: 1px solid #dddddd;
    border-radius: 8px;
    padding: 6px 3px;
    color: #cfcfcf;
}

.top_btn_r {
    border: 1px solid #f6e2e3;
    border-radius: 8px;
    padding: 6px;
    color: #b4b4b4;
    background-color: #f7eef7;
}
.top_btn_r:hover{
    background-color: #f6e6f3;
}
._input{
    height: 36px;
    width: 260px;
    padding: 1px;
    border-radius: 8px;
    background: linear-gradient(to right,#d9e7fa,#f6e2e3);
}
._input>div{
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: linear-gradient(to right,#ebf0fb,#f8eff7);
}

.mail{
    position: relative;
}

.mail::before{
    position: absolute;
    content: '';
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
    top: 1px;
    right: -1px;
}

.input_{
    height: 36px;
    flex: 1;
    outline: none;
    font-size: 14px;
}

</style>