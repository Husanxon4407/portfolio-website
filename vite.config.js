import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Served at the root on Vercel, but under /portfolio-website/ on GitHub Pages.
// Vercel sets the VERCEL env var during its build; GitHub Actions does not.
const base = process.env.VERCEL ? '/' : '/portfolio-website/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
      react(),
      tailwindcss(),
  ],
})
