import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'API': JSON.stringify(env.API),
      "REACT_APP_AUTH0_DOMAIN": JSON.stringify(env.REACT_APP_AUTH0_DOMAIN),
      "REACT_APP_AUTH0_CLIENT_ID": JSON.stringify(env.REACT_APP_AUTH0_CLIENT_ID)
    },
    plugins: [react()],
}
})