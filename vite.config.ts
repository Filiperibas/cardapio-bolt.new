import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/cardapio-bolt.new",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
