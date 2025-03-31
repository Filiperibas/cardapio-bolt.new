import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cardapio-bolt.new/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
