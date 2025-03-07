import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Permite acceso desde fuera del localhost
    port: 10000,      // Usa el puerto que Render asignará
    strictPort: true  // Evita que Vite cambie de puerto si está ocupado
  },
  preview: {
    host: '0.0.0.0',  
    port: 10000,  
    strictPort: true,
    allowedHosts: ['carrito-compras-react.onrender.com']  // Agregar el dominio de Render
  }
});
