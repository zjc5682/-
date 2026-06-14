// src/utils/language.js
import { useI18n } from "vue-i18n";

const LANGUAGE_KEY = 'lang'

// 向localStorage中存储语言
export function saveLanguage(lang) {
  localStorage.setItem(LANGUAGE_KEY, lang)
}

// 从localStorage获取系统语言
export function getLanguage() {
  return localStorage.getItem(LANGUAGE_KEY) || 'zh-cn'
}

// 系统语言初始化
export function initLanguage() {
  const { locale } = useI18n()
  const lang = localStorage.getItem(LANGUAGE_KEY) || 'zh-cn'
  locale.value = lang
}