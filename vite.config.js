import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'USDA_')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/usda' : {
          target: 'https://api.nal.usda.gov',
          changeOrigin: true,
          rewrite: (path) => {
            const url = new URL(
              path.replace(/^\/api\/usda/, '/fdc/v1'),
              'https://api.nal.usda.gov'
            )

            url.searchParams.set('api_key', env.USDA_API_KEY)

            return url.pathname + url.search
          }
        }
      }
    }
  }
})
