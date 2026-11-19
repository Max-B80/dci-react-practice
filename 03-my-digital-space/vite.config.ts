import { defineConfig } from 'vite' 
import react from '@vitejs/plugin-react' 
import tailwindcss from '@tailwindcss/vite' 
import { tanstackRouter } from '@tanstack/router-plugin/vite' 

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react', // 5. Tells the router plugin we are using React
      autoCodeSplitting: true, // 6. Loads each page only when visited (makes app faster)
    }),
    react(), // 7. Runs the React plugin (must come AFTER tanstackRouter)
    tailwindcss(), // 8. Runs the Tailwind CSS plugin
  ],
})