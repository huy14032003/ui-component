import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(()=>{
  const PORT = process.env.PORT || 3000
  const proxyConfig = {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, '')
    }
  }
  return{
    base: './',
    plugins: [
      tailwindcss(),
      react(),
      babel({ presets: [reactCompilerPreset()] })
    ],
    resolve: {
        alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        },
        {
          find: '@assets',
          replacement: path.resolve(__dirname, 'src/assets')
        },
        {
          find: '@lib',
          replacement: path.resolve(__dirname, 'src/lib')
        },
        {
          find: '@pages',
          replacement: path.resolve(__dirname, 'src/pages')
        },
        {
          find: '@components',
          replacement: path.resolve(__dirname, 'src/components')
        },
        {
          find: '@configs',
          replacement: path.resolve(__dirname, 'src/app/configs')
        },
        {
          find: '@services',
          replacement: path.resolve(__dirname, 'src/app/services')
        },
        {
          find: '@slices',
          replacement: path.resolve(__dirname, 'src/app/slices')
        },
        {
          find: '@type',
          replacement: path.resolve(__dirname, 'src/app/types')
        },
        {
          find: '@utils',
          replacement: path.resolve(__dirname, 'src/app/utils')
        },
        {
          find: '@hooks',
          replacement: path.resolve(__dirname, 'src/app/hooks')
        },
        {
          find: '@languages',
          replacement: path.resolve(__dirname, 'src/app/languages')
        },
        {
          find: '@constants',
          replacement: path.resolve(__dirname, 'src/app/constants')
        }
      ]
    },
     server: {
      host: true,
      port: +PORT || 8000,
      proxy: proxyConfig,
      open: true,
    },
    preview: {
      host: true,
      port: +PORT || 8000,
      open: true,
    },
  }
})