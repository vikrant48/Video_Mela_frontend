import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api/v1': 'https://videomela-backend.onrender.com'
    }
  },
  plugins: [react()],
})
