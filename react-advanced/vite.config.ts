import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'node:path'
// import babel from '@rolldown/plugin-babel'


// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    // babel({
    //   presets: [reactCompilerPreset()],
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
