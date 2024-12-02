import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/modify-app/",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'spotify-sdk': ['@spotify/web-api-ts-sdk'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
});
