import React, { useEffect } from 'react'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'
import { useRoutes, useLocation, Outlet } from 'react-router-dom'
import RouteList from './router/index'
import LayOut from './layout/index'
import './app.less'

type MyComponentProps = {
  themeColor: string
}

const App: React.FC<MyComponentProps> = props => {
  const location = useLocation()
  const loadingBar = React.useRef<LoadingBarRef>(null)
  const routing = useRoutes(RouteList)

  useEffect(() => {
    loadingBar.current?.continuousStart()

    const timer = setTimeout(() => {
      loadingBar.current?.complete()
      clearTimeout(timer)
    }, 300)

    return () => {
      loadingBar.current?.complete()
    }
  }, [location])

  return (
    <div id='app' className='w-screen h-screen'>
      <LoadingBar color={props.themeColor} ref={loadingBar} />
      {routing}
    </div>
  )
}

export default App
