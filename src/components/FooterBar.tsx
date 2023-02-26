import { Typography  } from 'antd'
const { Text } = Typography

const FooterBar = () => {
  return <Text type='secondary'>简易工作台 © {new Date().getFullYear()}</Text>
}

export default FooterBar