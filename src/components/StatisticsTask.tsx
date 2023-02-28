import { useEffect } from 'react'
import { Card, Col, Row, Statistic } from 'antd'
import { useModel } from 'umi'

const StatisticsTask = () => {
  const { filterTaskType } = useModel<any>('useCreateTaskModelOpen')
  return (
    <Row gutter={[16, 16]}>
      <Col xs={12} sm={12} md={12} lg={6} xl={6}>
        <Card>
          <Statistic title='紧急' value={filterTaskType('Urgent')} prefix={<i className='ri-rocket-2-line' />} />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={12} lg={6} xl={6}>
        <Card>
          <Statistic title='重要' value={filterTaskType('Important')} prefix={<i className='ri-alarm-warning-line' />} />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={12} lg={6} xl={6}>
        <Card>
          <Statistic title='待办' value={filterTaskType('Todo')} prefix={<i className='ri-time-line' />} />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={12} lg={6} xl={6}>
        <Card>
          <Statistic title='完成率' value={filterTaskType('completionRate')} suffix='%' prefix={<i className='ri-star-smile-line' />} />
        </Card>
      </Col>
    </Row>
  )
}

export default StatisticsTask
