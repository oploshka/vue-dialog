import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    tsconfigPaths: true,
  },

  test: {
    environment: 'node',
    include: ['test/unit/**/*.spec.ts'],
    restoreMocks: true,
  },
})
