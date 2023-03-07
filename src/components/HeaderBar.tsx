import { useState } from 'react'
import { useModel, history } from 'umi'
import type { MenuProps } from 'antd'
import { Button, Row, Col, Space, Menu } from 'antd'

const items: MenuProps['items'] = [
  {
    label: '工作台',
    key: '/',
    icon: <i className='ri-home-line' />
  },
  {
    label: '工作流',
    key: '/MyWorkflow',
    icon: <i className="ri-flow-chart" />
  }
]

const HeaderBar = () => {
  const [current, setCurrent] = useState(localStorage.getItem('currentPage') || '/')
  const { isDarkTheme, changeTheme } = useModel<any>('useLayoutsConfig') as any

  const onClickMenu: MenuProps['onClick'] = (e) => {
    localStorage.setItem('currentPage', e.key)
    history.push(e.key)
    setCurrent(e.key)
  }

  return (
    <Row justify={'space-between'}>
      <Col>
        <Space size={20}>
          <div className='logo'>My Workspace</div>
          <Menu mode='horizontal' items={items} selectedKeys={[current]} onClick={onClickMenu} />
        </Space>
      </Col>
      <Col>
        <Space className='action'>
          <Button
            type='text'
            icon={<i className={isDarkTheme ? 'ri-contrast-2-line' : 'ri-sun-line'} />}
            onClick={() => changeTheme()}
          />
        </Space>
      </Col>
    </Row>
  )
}

export default HeaderBar