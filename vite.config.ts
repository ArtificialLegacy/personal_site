import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      modules: '/src/modules',
      utility: '/src/utility',
      hooks: '/src/hooks',
      data: '/src/data',
    },
  },
})
