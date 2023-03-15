// import React from "react";
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App'

// antd全局配置
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

// 根据屏幕尺寸调整rem
import { setDomFontSize } from './utils/dom'
setDomFontSize()

// 引入tailwindcss
import './tailwind.css'

// 清空浏览器默认样式
import './reset.css'

// 页面点击特效
import { clickEffect } from './utils/clickEffect'
clickEffect()

// 配置
import Config from './store/Config'
console.log(Config)

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: Config.theme.themeColor,
          colorBorderSecondary: Config.theme.colorBorderSecondary
        }
      }}
    >
      <BrowserRouter>
        <App themeColor={Config.theme.themeColor} />
      </BrowserRouter>
    </ConfigProvider>
  )
}
