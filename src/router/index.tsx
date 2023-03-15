import React, { lazy, Suspense } from 'react'
import { Vortex } from 'react-loader-spinner'

// layout不进行懒加载
import Layout from '@/layout/index'

// 懒加载
const Home = lazy(() => import('@/views/Home'))
const About = lazy(() => import('@/views/About'))
const NoFound = lazy(() => import('@/views/Other/404'))

// 加载组件动画
const LoadingComponent: React.FC = () => {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Vortex
        visible={true}
        height='120'
        width='120'
        ariaLabel='vortex-loading'
        wrapperStyle={{}}
        wrapperClass='vortex-wrapper'
        colors={['#A76AAE', '#E7C996', '#ECECD0', '#FF7F9D', '#FF8C9F', '#FFB07F']}
      />
    </div>
  )
}

const Loading: React.FC<{ Component: any }> = ({ Component, ...rest }) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Component {...rest} />
    </Suspense>
  )
}

const routes: RouteInfo[] = [
  {
    path: '/',
    exact: true,
    element: <Layout />,
    title: '首页',
    children: [
      {
        path: '/home',
        element: <Loading Component={Home} />,
        title: '首页'
      },
      {
        path: '/about',
        element: <Loading Component={About} />,
        title: '个人简介'
      },
      {
        path: '*',
        element: <Loading Component={NoFound} />,
        hide: true,
        title: 'Not Found'
      }
    ]
  }
]

export default routes
