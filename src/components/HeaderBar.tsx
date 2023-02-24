import { Row, Col } from 'antd'

const HeaderBar = () => {
  return (
    <Row justify={'space-between'}>
      <Col>
        <div className='logo'>My Workspace</div>
      </Col>
      <Col></Col>
    </Row>
  )
}

export default HeaderBar