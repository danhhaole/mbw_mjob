import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { webserver_port } from '../../../sites/common_site_config.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: `http://localhost:${webserver_port}`,
        changeOrigin: true,
      },
      '/assets': {
        target: `http://localhost:${webserver_port}`,
        changeOrigin: true,
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: `../${path.basename(path.resolve('..'))}/public/jdstore`,
    emptyOutDir: true,
    target: 'es2015',
  },
  optimizeDeps: {
    include: ['frappe-ui > feather-icons', 'showdown', 'engine.io-client'],
  },
})