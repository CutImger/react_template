// import React from "react";
import React from 'react'
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

// 页面点击特效
import { clickEffect } from './utils/clickEffect'
clickEffect()

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  )
}
