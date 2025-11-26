import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // ✅ 开发服务器设置
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    origin: 'http://47.242.1.178:12356',  // 让 Django 模板能正确引用
    cors: {
      origin: 'http://47.242.1.178:12355' // 明确允许 Django 服务器的公网地址
    }
  },

  // ✅ 构建输出给 Django 使用
  build: {
    // 将构建产物直接输出到 Django app 的 static 目录，方便 collectstatic 收集
    outDir: 'dist',
    emptyOutDir: true,
    manifest: true,
    // 关闭文件名哈希，保持与模板引用一致的路径
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
})
