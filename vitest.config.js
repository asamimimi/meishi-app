import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'


export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/vitest-setup.ts"],
        // react-loader-spinner(ESM) が CommonJS の styled-components を default import しており、
        // Node が直接読み込むと styled.div が undefined になるため Vite で変換させる
        server: {
            deps: {
                inline: ["react-loader-spinner"],
            },
        },
    },
})