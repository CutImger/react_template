import React from 'react'
import { Button, Space } from 'antd'
import './app.less'

const App: React.FC = () => {
  return (
    <div id='app'>
      <Space direction='vertical' className=' w-28 h-16 bg-red-600'>
        <Space>
          <Button type='primary'>测试提交1111</Button>
          <Button type='primary' disabled>
            Primary(disabled)
          </Button>
        </Space>
      </Space>
    </div>
  )
}

export default App
