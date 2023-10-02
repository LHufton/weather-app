import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: {
      '.js': 'jsx'
    }
  },
  server: {
    https: {
      // https => https://localhost:3000 | http => http://localhost:3000
      maxSessionMemory: 100
    }
  }
})
