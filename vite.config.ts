import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite conexiones externas
    allowedHosts: ['.ngrok-free.app'], // Permite ngrok
    port: 5173 // Asegura que usa el puerto correcto
  }
})
