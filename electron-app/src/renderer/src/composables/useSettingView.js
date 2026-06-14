// useSettingView.js
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { saveLanguage, getLanguage } from '../utils/language'

export function useSettingView() {
  const { locale } = useI18n()

  // 默认激活的选项卡
  const selectedTab = ref('system')
  // 下拉框选中的语言
  const selectedLanguage = ref(getLanguage())

  // 切换语言
  const switchLanguage = () => {
    locale.value = selectedLanguage.value
    saveLanguage(selectedLanguage.value)
  }

  return {
    selectedTab,
    selectedLanguage,
    switchLanguage
  }
}