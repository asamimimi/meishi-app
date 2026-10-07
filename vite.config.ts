import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 相対パスでアセットを参照
  plugins: [react()],
  build: {
    outDir: 'dist', // 出力ディレクトリ
  },
})