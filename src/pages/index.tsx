import TaskList from '@/components/TaskList'
import DayTask from '@/components/DayTask'
import { Row, Col } from 'antd'

const HomePage = () => {
  return (
    <Row className='page' gutter={[16, 16]}>
      <Col xs={24} sm={24} md={14} lg={16} xl={18}>
        <TaskList />
      </Col>
      <Col xs={24} sm={24} md={10} lg={8} xl={6}>
        <DayTask />
      </Col>
    </Row>
  )
}

export default HomePage