import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.less'
import { Button } from 'antd'

function App() {
  console.log(import.meta.env)
  return (
    <div className="App">
      <h1>hello world</h1>
      <Button type="primary">Primary Button</Button>
      <div className="box"></div>
    </div>
  )
}

export default App
