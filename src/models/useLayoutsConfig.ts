import { useEffect } from 'react'
import { UseConfig } from '@/models/models.types'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import { useSetState } from 'ahooks'
import { theme } from 'antd'
const { defaultAlgorithm, darkAlgorithm } = theme

const useConfig = (): UseConfig => {
  const bodyDom = document.querySelector('body')
  const newTime:string = dayjs(Date.now()).format('HHmm')

  const token = { colorPrimary: '#2F54EB' }
  const [ themeConfig, setThemeConfig ] = useSetState({
    algorithm: [defaultAlgorithm],
    token
  })

  useEffect(() => {
    if (newTime >= '1820') {
      setThemeConfig({ algorithm: [darkAlgorithm], token })
      bodyDom?.setAttribute('theme', 'drak')
    } else {
      bodyDom?.setAttribute('theme', 'default')
    }
  }, [newTime])

  const changeTheme = (isDark: Boolean) => {
    setThemeConfig({ algorithm: [isDark ? darkAlgorithm : defaultAlgorithm], token })
    bodyDom?.setAttribute('theme', isDark ? 'drak' : 'default')
  }

  return {
    zhCN,
    themeConfig,
    setThemeConfig,
    changeTheme
  }
}

export default useConfig