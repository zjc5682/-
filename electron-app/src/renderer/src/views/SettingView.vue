<!-- SettingView.vue -->
<template>
  <div class="px-10">
    <h2 class="text-2xl">{{ $t('setting.title') }}</h2>
    <div>
      <el-tabs v-model="selectedTab" class="custom-class tabs-dark">
        <el-tab-pane :label="$t('setting.account.title')" name="account">
          账号设置
        </el-tab-pane>
        <el-tab-pane :label="$t('setting.routine.title')" name="routine">
          常规设置
        </el-tab-pane>
        <el-tab-pane :label="$t('setting.system.title')" name="system">

          <div class="flex flex-col gap-3">
            <!--切换语言start-->
            <div class="flex items-center gap-3">
              <div class="w-[5em] text-right">{{ $t('setting.system.language') }}</div>
              <el-select v-model="selectedLanguage" @change="switchLanguage" style="width: 240px">
                <el-option label="简体中文" value="zh-cn"></el-option>
                <el-option label="繁體中文" value="zh-tw"></el-option>
                <el-option label="English" value="en-us"></el-option>
              </el-select>
            </div>
            <!--切换语言end-->

            <!--切换主题start---->
            <div class="flex items-center gap-3">
              <span class="w-[5em] text-right">{{ $t('setting.system.theme') }}</span>
              <el-radio-group v-model="mode" @change="setTheme">
                <el-radio value="system">{{ $t('setting.system.follow_system') }}</el-radio>
                <el-radio value="light">{{ $t('setting.system.light') }}</el-radio>
                <el-radio value="dark">{{ $t('setting.system.dark') }}</el-radio>
              </el-radio-group>
            </div>
            <!--切换主题end---->
            
          </div>


        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { useSettingView } from '../composables/useSettingView';
const { selectedTab, selectedLanguage, switchLanguage } = useSettingView();

//切换主题逻辑

import { useTheme } from '../composables/useTheme';
const { mode, setTheme } = useTheme();
</script>

<style scoped>

.custom-select :deep(.el-select__wrapper) {
    border-radius: 8px;
    border-color: #e4e8ec;
}

.custom-radio-group :deep(.el-radio-button) {
    border-radius: 6px;
    margin-right: 8px;
}


/* 下拉选项样式 */
.dark :deep(.el-select-dropdown) {
    background-color: #191919;
    border-color: #3a3a42;
}

.dark :deep(.el-select-dropdown__item) {
    color: #d4d4d6;
}

.dark :deep(.el-select-dropdown__item:hover) {
    background-color: #28282d;
}

.dark :deep(.el-select-dropdown__item.selected) {
    background-color: rgba(252, 54, 65, 0.15);
    color: #fc3641;
}

/* 深色模式下标签页样式 */
.dark .tabs-dark :deep(.el-tabs__header) {
    border-bottom-color: #27272e;
}

.dark .tabs-dark :deep(.el-tabs__item) {
    color: #a4a4a6;
}

.dark .tabs-dark :deep(.el-tabs__item:hover) {
    color: #d4d4d6;
}

.dark .tabs-dark :deep(.el-tabs__item.is-active) {
    color: #fc3641;
}

</style>