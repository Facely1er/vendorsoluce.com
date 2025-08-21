import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
/// <reference types="vitest" />

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
        manualChunks: (id) => {
          // Core vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'vendor-charts';
            }
            if (id.includes('@supabase') || id.includes('supabase')) {
              return 'vendor-supabase';
            }
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'vendor-pdf';
            }
            if (id.includes('i18next') || id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            if (id.includes('zustand') || id.includes('fast-xml-parser')) {
              return 'vendor-utils';
            }
            // All other node_modules
            return 'vendor-misc';
          }
          
          // Application code chunking
          if (id.includes('/pages/')) {
            if (id.includes('/tools/')) {
              return 'pages-tools';
            }
            if (id.includes('Dashboard') || id.includes('User')) {
              return 'pages-dashboard';
            }
            if (id.includes('SBOM') || id.includes('Assessment')) {
              return 'pages-assessment';
            }
            if (id.includes('Vendor')) {
              return 'pages-vendor';
            }
            return 'pages-misc';
          }
          
          if (id.includes('/components/')) {
            if (id.includes('/charts/') || id.includes('/data/')) {
              return 'components-data';
            }
            if (id.includes('/vendor/') || id.includes('/assessment/')) {
              return 'components-features';
            }
            return 'components-common';
          }
          
          if (id.includes('/utils/') || id.includes('/lib/')) {
            return 'app-utils';
          }
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
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
});