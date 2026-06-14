import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy, rarely-changing libraries into their own chunk so the
        // browser can cache them across app deploys and parse them in parallel.
        manualChunks: {
          gsap: ['gsap', 'gsap/ScrollTrigger', '@gsap/react'],
          lenis: ['lenis'],
        },
      },
    },
  },
})
