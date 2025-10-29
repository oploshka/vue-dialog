//
import { defineConfig } from 'vite'
// plugin
import vue from '@vitejs/plugin-vue';
// import dts from 'vite-plugin-dts';
//
import path from 'path';
import {fileURLToPath, URL} from "node:url";

const aliasObj = {
  '@app':     path.resolve(__dirname, './test/app'),
  '@example': path.resolve(__dirname, './example'),
  'vue-dlg':  path.resolve(__dirname, './src'),
  '@': fileURLToPath( new URL( './src', import.meta.url ) )
};

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {

  const isPhPages = mode === 'ph-pages';
  const isLibrary = mode === 'library';
  //
  console.log('command: ', command);
  console.log('mode: ', mode, isPhPages, isLibrary);
  //


  if(isLibrary) {
    return defineConfig({
      plugins: [
        vue(), // Плагин для обработки файлов .vue
        // TODO: Также полезно установить плагин для генерации TypeScript-типов, если вы используете TypeScript:
        // dts({
        //   insertTypesEntry: true, // Встраивает точку входа для типов
        // }),
      ],
      resolve: {
        alias: aliasObj,
        // dedupe: ['vue'],
      },
      build: {

        outDir: path.resolve(__dirname, 'lib'),
        emptyOutDir: true, // also necessary

        lib: {
          entry: path.resolve(__dirname, 'src/install.ts'), // Точка входа в библиотеку
          name: 'MyVueComponentLibrary', // Название глобальной переменной
          // fileName: (format) => `my-vue-component-library.${format}.js`, // Название выходного файла
          // fileName: '[name].[hash].js',
        },
        rollupOptions: {
          external: ['vue'], // Исключаем Vue из бандла
          output: {
            globals: {
              vue: 'Vue', // Определяем глобальную переменную для Vue
            },
          },
        },
      },
    });
  }


  return {
    plugins: [vue()],

    resolve: {
      alias: aliasObj,
      dedupe: ['vue'],
    },

    root: './test/app',

    base: isPhPages ? '/vue-dialog/' : '/',

    build: {
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true, // also necessary
    }
    // build: {
    //   // outDir: 'dist',
    //   // emptyOutDir: true, // also necessary
    //   //
    //   // minify: mode === 'development' ? false : 'terser',
    //   // watch: {
    //   //   include: 'src/**',
    //   //   exclude: 'node_modules/**, .git/**, dist/**, .vscode/**',
    //   // },
    //   // assetsDir: 'assets',
    //   // cssCodeSplit: false,
    //   // sourcemap: false,
    //   // ssr: false,
    //
    //   // 4. Добавьте `rewrite` чтобы отключить создание папок
    //   rewriting: false, // По умолчанию 'true', что создает папки
    //
    //   rollupOptions: {
    //     // treeshake: true,
    //     //
    //     input: {
    //       main: path.resolve(__dirname, 'test/app/index.html'),
    //     },
    //     //
    //     // output: {
    //     //   assetFileNames: 'client/rsc1/[ext]/[name][extname]',
    //     //   chunkFileNames: 'client/rsc2/[chunks]/[name].[hash].js',
    //     //   entryFileNames: 'client/rsc3/js/client.js'
    //     //
    //     //   // entryFileNames: `assets/index.js`,
    //     //   // chunkFileNames: `assets/index-chunk.js`,
    //     //   // assetFileNames: `assets/[name].[ext]`,
    //     //
    //     //   // 3. Отключите создание папок для HTML-файлов
    //     //   dir: 'dist', // Укажите вашу выходную директорию
    //     //   format: 'es', // Или другой формат, в зависимости от ваших потребностей
    //     // }
    //     output: {
    //       // 2. Настройте `entryFileNames` для сохранения HTML-файлов в корне
    //       entryFileNames: '[name].js', // Сохраняет JS файлы с именами из входных точек
    //       assetFileNames: '[name].[ext]', // Сохраняет ассеты с именами из входных точек
    //       // 3. Отключите создание папок для HTML-файлов
    //       dir: 'dist', // Укажите вашу выходную директорию
    //       format: 'es', // Или другой формат, в зависимости от ваших потребностей
    //     },
    //   },
    // },

    // server: {
      // open: '/test/app/index.html',
    // },
  }
});
