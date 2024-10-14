import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


import path from 'path';
import dts from 'vite-plugin-dts';
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    vue(),
    // cssInjectedByJsPlugin({ useStrictCSP: true, relativeCSSInjection: false }),
    dts({ rollupTypes: true }),
  ],
  resolve: {
    alias: {
      'vue-dlg-plugin': path.join(__dirname, './src/plugin'),
    }
  },
  build: {
    lib: {
      name: 'vue3-module',
      entry: path.resolve(__dirname, 'src/main.ts'),
      fileName: (format) => `vue3-module.${format}.js`,
    },
    emptyOutDir: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },

})


// import path from 'path';

// https://vitejs.dev/config/
// export default defineConfig({
//   build: {
//     lib: {
//       // entry: path.resolve(__dirname, "./index.ts"),
//       // name: "HtmlInjection",
//       entry: "./src/plugin.ts",
//       fileName: "index",
//       formats: ["es", "cjs"],
//     },
//     rollupOptions: {
//       external: ["fs", "path"],
//     },
//   },
//   plugins: [vue()],
// })

// create vite app
// https://vite-docs-ru.vercel.app/guide/#быстрое-развёртывание-вашего-vite-проекта-scaffolding

// vite config for plugin
// https://www.devbookmarks.com/p/vite-answer-index-html-location-guide

/*
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  root: resolve(path, 'templates'),
  base: 'https://aaronchristian.test/wp-content/themes/portfolio/',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./src/main.js', import.meta.url)),
        'index.html': fileURLToPath(new URL('./templates/index.html', import.meta.url))
      },
      output: {
        dir: 'dist',
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[extname]',
        chunkFileNames: 'assets/[name].js'
      }
    }
  }
})
 */