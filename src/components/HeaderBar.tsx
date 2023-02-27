import { useModel } from 'umi'
import { Button, Row, Col } from 'antd'

const HeaderBar = () => {
  const { isDarkTheme, changeTheme } = useModel<any>('useLayoutsConfig') as any
  return (
    <Row justify={'space-between'}>
      <Col>
        <div className='logo'>My Workspace</div>
      </Col>
      <Col>
        <div className='action'>
          <Button type='text'
            icon={<i className={isDarkTheme ? 'ri-contrast-2-line' : 'ri-sun-line'} />}
            onClick={() => changeTheme()}
          />
        </div>
      </Col>
    </Row>
  )
}

export default HeaderBar