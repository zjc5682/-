// 国际化配置文件
import { createI18n } from 'vue-i18n'

// 导入语言包
import zhCN from './zh-CN'
import enUS from './en-US'
import zhTW from './zh-TW'

// 设置语言包
const messages = {
  'zh-cn': { ...zhCN },
  'en-us': { ...enUS },
  'zh-tw': { ...zhTW }
}

// 实例化一个i18n对象
const i18n = createI18n({
  globalInjection: true, // 开启全局配置
  messages, // 挂载语言包
  locale: localStorage.getItem('language') || 'zh-cn' // 设置默认语言
})

// 导出国际化配置
export default i18n