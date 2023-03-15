import { configure } from 'mobx'
import { makeAutoObservable } from 'mobx'
// 开启Mobx严格模式
configure({ enforceActions: 'observed' })

// 创建Store
class Config {
  theme = {
    themeColor: '#FF7F9D',
    colorBorderSecondary: '#ECECD0'
  }

  constructor() {
    makeAutoObservable(this) // 响应式处理
  }
}
const config = new Config()
export default config
