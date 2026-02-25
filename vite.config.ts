import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404-for-spa',
      closeBundle() {
        const outDir = path.resolve(__dirname, 'dist');
        const indexPath = path.join(outDir, 'index.html');
        const notFoundPath = path.join(outDir, '404.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3039,
  },
  build: {
    outDir: 'dist',
  },
});
