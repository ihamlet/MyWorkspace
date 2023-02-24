
import { UseConfig } from '@/models/models.types'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import { useSetState } from 'ahooks'
import { theme } from 'antd'
const { defaultAlgorithm, darkAlgorithm } = theme

const useConfig = ():UseConfig => {
  const [ themeConfig, setThemeConfig ] = useSetState({
    algorithm: [ defaultAlgorithm ],
    token: {
      colorPrimary: '#2F54EB'
    }
  })

  return {
    zhCN,
    themeConfig,
    setThemeConfig
  }
}

export default useConfig