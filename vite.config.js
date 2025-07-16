import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Change this to relative path
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})