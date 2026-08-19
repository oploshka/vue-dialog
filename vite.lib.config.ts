import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [vue()],

  resolve: {
    tsconfigPaths: true,
  },

  build: {
    outDir: path.resolve(rootDir, './lib'),
    emptyOutDir: true,

    lib: {
      entry: path.resolve(rootDir, './src/install.ts'),
      name: 'VueDlg',
      formats: ['es'],
      fileName: 'index',
    },

    rolldownOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
