import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

//原子化css引擎 https://unocss.nodejs.cn/integrations/vite
import UnoCSS from 'unocss/vite'

//Element Plus UI框架 按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {
      proxy: {
        //配置代理 axios //https://cn.vitejs.dev/config/server-options#server-proxy
        '/api': {
          target: 'https://quick-server-sp.ixuea.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/rs': {
          target: 'https://rs.ixuea.com/quick',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/rs/, '')
        }
      }
    }
  }
})