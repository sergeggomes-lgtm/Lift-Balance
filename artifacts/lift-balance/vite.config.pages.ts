/**
 * Vite config for GitHub Pages deployment.
 * Does NOT require PORT or BASE_PATH env vars (unlike the dev config).
 * Set VITE_BASE_PATH in CI — the GitHub Actions workflow sets it automatically
 * to /<repo-name>/ using github.event.repository.name.
 */
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const base = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
});
