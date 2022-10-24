import { defineConfig, ConfigEnv, UserConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
// 显示打包进度
import progress from 'vite-plugin-progress'
// 拆包
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
// 按需加载
import vitePluginImp from 'vite-plugin-imp'
//兼容旧版本浏览器
import legacy from '@vitejs/plugin-legacy'
// ESlint
import eslintPlugin from '@nabla/vite-plugin-eslint'

export default defineConfig((mode: ConfigEnv): UserConfig => {
  return {
    plugins: [
      react(),
      progress(),
      chunkSplitPlugin({
        strategy: 'default',
        customSplitting: {
          'react-vendor': ['react', 'react-dom'],
          utils: [/src\/utils/]
        }
      }),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: (name) => `antd/es/${name}/style`
          }
        ]
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      eslintPlugin()
    ],
    server: {
      port: 8888
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      rollupOptions: {
        output: {
          // 最小化拆分包
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'js/[name].[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: '[ext]/[name].[hash].[ext]',
          // 拆分js到模块文件夹
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : []
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || '[name]'
            return `js/${fileName}/[name].[hash].js`
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve(
              'src/assets/global/global.less'
            )}";`
          },
          javascriptEnabled: true
        }
      }
    }
  }
})
