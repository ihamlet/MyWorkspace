import { Typography  } from 'antd'
const { Text } = Typography

const FooterBar = () => {
  return (
    <Text type='secondary'>工作流 © {new Date().getFullYear()}</Text>
  )
}

export default FooterBar