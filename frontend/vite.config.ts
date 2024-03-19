/* eslint-disable import/no-nodejs-modules */

/* eslint-disable import/no-default-export */

/* eslint-disable unicorn/prefer-module */
/// <reference types="vite/client" />
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * https://vitejs.dev/config/
 * https://vitest.dev/config/
 */

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    cors: false,
  },
  build: {
    target: 'ES6',
    outDir: 'dist',
    minify: 'esbuild',
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    cors: false,
  },
  resolve: {
    alias: {
      '@/tests': resolve(__dirname, '__tests__'),
      '@': resolve(__dirname, 'src'),
    },
  },
})
