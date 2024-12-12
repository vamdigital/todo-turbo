import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    force: true,
    exclude: ['@storybook/addon-interactions', '@storybook/react-vite']
  },
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})
