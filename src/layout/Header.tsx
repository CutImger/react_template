import React from 'react'
import { Link } from 'react-router-dom'
import RouteList from '@/router/index'

const Header: React.FC = () => {
  return (
    <nav>
      <ul>
        {RouteList[0].children
          ?.filter(item => !item.hide)
          .map((route: RouteInfo, index: number) => (
            <li key={index}>
              <Link to={route.path}>{route.title}</Link>
              {route.children && (
                <ul>
                  {route.children.map((childRoute: RouteInfo, childIndex: number) => (
                    <li key={childIndex}>
                      <Link to={childRoute.path}>{childRoute.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default Header
