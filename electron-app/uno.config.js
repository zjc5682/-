//更改这个文件需要重新运行项目
import { defineConfig } from 'unocss'
//TailwindCSS预设
//https:// unocss.nodejs.cn/presets/wind4
import presetWind4 from '@unocss/preset-wind4'
export default defineConfig({
  presets: [presetWind4()],
  rules: [
    //支持 flex-1 ~ flex-5，表示 flex:n n 0%
    [
      /^flex-(\d)$/,
      ([, d]) => ({
        flex: `${d} ${d} 0%`
      })
    ]
   ],
  // 主题预设，统一项目颜色
  theme: {
    colors: {
      primary: '#fc3641',
      'record-player-second-button': '#525a6c',
      'record-player-second-button-play-page': '#b9bcbc',
      background: '#f7f9fc',
      'dark-background': '#111111',
      surface: '#ffffff',
      'dark-surface': '#191919',
      'on-surface': '#384051',
      'dark-on-surface': '#d4d4d6',
      'on-secondary': '#757a88',
      'dark-on-secondary': '#a4a4a6',
      outline: '#7C828F',
      'dark-outline': '#1b1b20',
      /* 主界面侧边栏背景 */
      'slide-background': '#F0F3F6',
      'dark-slide-background': '#1a1a21',
      hover: '#e3e6ec',
      'dark-hover': '#28282d',
      link: '#596c94',
      arrow: '#989da7',
      /*分割线颜色*/
      divider: '#e4e8ec',
      /*底部播放器分割线颜色*/
      'player-divider': '#e5e6e8',
      /*分割线颜色*/
      'dark-divider': '#27272e',
      /*底部播放器分割线颜色*/
      'dark-player-divider': '#42424c'
    }
  }
})
