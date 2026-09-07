import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'unplugin-dts/vite'

import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: path.resolve(rootDir, './tsconfig.app.json'),
      processor: 'vue',
      include: ['src/**/*.ts', 'src/**/*.vue'],
      entryRoot: path.resolve(rootDir, './src'),
      outDirs: path.resolve(rootDir, './lib'),
      bundleTypes: true,
    }),
  ],

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
      cssFileName: 'index',
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
