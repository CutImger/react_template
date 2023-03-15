interface RouteInfo {
  path: string
  exact?: boolean
  element: React.ReactNode // 修改类型为ReactNode
  title: string
  children?: RouteInfo[]
  hide?: boolean
}
