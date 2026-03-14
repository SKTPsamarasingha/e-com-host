import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [react(), tailwindcss()],
        server: {
            port: 2000,
            proxy: {
                '/e-com/auth': env.VITE_SERVER_AUTH_URL,
                '/e-com/api': env.VITE_SERVER_API_URL,
            },
        }
    }
})