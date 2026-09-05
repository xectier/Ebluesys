import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html'),
        layouts: resolve(__dirname, 'layouts.html'),
        features: resolve(__dirname, 'features.html'),
        howItWorks: resolve(__dirname, 'how-it-works.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        security: resolve(__dirname, 'security.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
