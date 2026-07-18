import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      /* "Whenever a request starts with /api, don't handle it yourself. Forward it to localhost:8000."
      The browser never knows about port 8000.It thinks everything is coming from 5173.
      react->vite->proxy->backend*/
      "/api": { target: "http://localhost:8000" }
    }
  }
})
