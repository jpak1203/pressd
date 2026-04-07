import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': [
                        'react',
                        'react-dom',
                        'react-router',
                        'react-router-dom',
                    ],
                    'vendor-chakra': [
                        '@chakra-ui/react',
                        '@emotion/react',
                    ],
                    'vendor-supabase': ['@supabase/supabase-js'],
                },
            },
        },
    },
})
