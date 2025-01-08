import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'), // Main popup HTML
        background: resolve(__dirname, 'src/background.js'), // Background script path
        content: resolve(__dirname, 'src/content.js'), // Content script path
        options: resolve(__dirname, 'src/options.html'), // Options page path
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === 'background' || chunk.name === 'content' ? '[name].js' : 'assets/[name].js',
      },
    },
    outDir: 'dist', // Output directory
  },
  buildEnd() {
    // Copy manifest file to the dist directory after build
    const manifestSrc = resolve(__dirname, 'manifest.json');
    const manifestDest = resolve(__dirname, 'dist/manifest.json');
    if (fs.existsSync(manifestSrc)) {
      fs.copyFileSync(manifestSrc, manifestDest);
      console.log('Manifest file copied to dist folder');
    } else {
      console.error('manifest.json file not found in the root directory');
    }

    // Copy options.html to the dist folder if it exists
    const optionsSrc = resolve(__dirname, 'src/options.html');
    const optionsDest = resolve(__dirname, 'dist/options.html');
    if (fs.existsSync(optionsSrc)) {
      fs.copyFileSync(optionsSrc, optionsDest);
      console.log('Options file copied to dist folder');
    } else {
      console.error('options.html file not found in the src directory');
    }
  },
});