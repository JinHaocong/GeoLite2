import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/GeoLite2/',
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://download.maxmind.com', // 目标服务器
        changeOrigin: true, // 确保代理请求时，使用目标服务器的Origin
        secure: false, // 忽略https的SSL验证（如果必要）
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
