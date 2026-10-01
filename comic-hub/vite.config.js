import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:91',
        changeOrigin: true,
      },
      '/anime/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/anime/content': { target: 'http://localhost:91', changeOrigin: true },
      '/comic/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/comic/content': { target: 'http://localhost:91', changeOrigin: true },
      '/fiction/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/fiction/content': { target: 'http://localhost:91', changeOrigin: true },
      '/movie/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/movie/content': { target: 'http://localhost:91', changeOrigin: true },
      '/series/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/series/content': { target: 'http://localhost:91', changeOrigin: true },
    }
  }
})