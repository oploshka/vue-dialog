import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ mode }) => ({
  plugins: [vue()],

  resolve: {
    tsconfigPaths: true,
    dedupe: ['vue'],
  },

  root: path.resolve(rootDir, './test/app'),

  base: mode === 'ph-pages' ? '/vue-dialog/' : '/',

  build: {
    outDir: path.resolve(rootDir, './dist'),
    emptyOutDir: true,
  },
}))
