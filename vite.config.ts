import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: "./certs/dev_localhost.key",
      cert: "./certs/dev_localhost.pem",
    },
  },
  plugins: [vue()],
})
