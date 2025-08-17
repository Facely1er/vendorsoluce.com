import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          supabase: ['@supabase/supabase-js'],
          utils: ['jspdf', 'html2canvas', 'i18next'],
        },
      },
      input: {
        main: '/index.html'
      }
    },
    sourcemap: false,
    reportCompressedSize: false,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    historyApiFallback: {
      index: '/index.html',
    },
  }
});