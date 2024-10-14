//
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//
import path from 'path';
import GetRootPath from '../utils/GetRootPath.js'

console.log('test-app-serve', GetRootPath);

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@vue-dlg-plugin': path.join(GetRootPath, './src/plugin'),
      '@vue-dlg-page': path.join(GetRootPath, './src/gh-page'),
    }
  },
})
