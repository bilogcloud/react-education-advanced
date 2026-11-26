/// <reference types="vitest/config" />
import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    // babel({
    //   presets: [reactCompilerPreset()],
    // }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setupTests.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
