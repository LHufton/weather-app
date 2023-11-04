import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Log statement to confirm this file is being read
console.log('Config is being read');

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
    },
    port: 3001  // Set your desired port here
  }
})
