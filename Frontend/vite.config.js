import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Enable source maps for the build
  },
  server: {
    port: 5000,
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
