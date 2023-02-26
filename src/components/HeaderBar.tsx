import { useState } from 'react'
import { useModel } from 'umi'
import { Button, Row, Col } from 'antd'

const HeaderBar = () => {
  const [isDark, setTheme] = useState<Boolean>(false)
  const { changeTheme } = useModel<any>('useLayoutsConfig') as any
  const toggleTheme = () => {
    setTheme(isDark ? false : true)
    changeTheme(isDark)
  }

  return (
    <Row justify={'space-between'}>
      <Col>
        <div className='logo'>My Workspace</div>
      </Col>
      <Col>
        <div className='action'>
          <Button type='text'
            icon={<i className={isDark ? 'ri-contrast-2-line' : 'ri-sun-line'} />}
            onClick={() => toggleTheme()}
          />
        </div>
      </Col>
    </Row>
  )
}

export default HeaderBar