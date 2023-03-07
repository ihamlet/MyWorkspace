import { useState, useEffect } from 'react'
import { Row, Col, Button, List, Segmented, Space, Card, Tag, Checkbox } from 'antd'
import { PlusOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useModel } from 'umi'
import { Task, TaskState, ProcessStatus, ProcessStatusType } from '@/models/models.types'
import StatisticsTask from '@/components/StatisticsTask'

const TaskList = () => {
  const { taskList, setModelOpen, setTaskState, removeTaskItem } = useModel<any>('useTask')
  const groupList = (processStatus:ProcessStatusType): any[] => {
    const list: any = Array.from(taskList).filter((item: any) => {
      const [key, value] = item
      return processStatus ? value.processStatus === processStatus : item
    })
    return list.reverse()
  }

  const [list, setList] = useState(groupList(''))
  useEffect(() => setList(groupList('')), [taskList])
  const [checkedState, setCheckedState] = useState('')

  const onProcessStatusChange = (e: any, item: any) => {
    const [key, value] = item
    let processStatus = ''
    if (e.target.checked) {
      processStatus = checkedState === 'Processing' ? 'Completed' : 'Processing'
    } else {
      processStatus = checkedState === 'Completed' ? 'Processing' : ''
    }

    setTaskState({
      key: key,
      value: {
        ...value,
        processStatus
      }
    })
  }

  const CheckboxDom = (task: Task, item: any) => {
    if (checkedState === '') {
      if (task.processStatus === 'Completed') {
        return <Tag icon={<CheckCircleOutlined />} color="success">已完成</Tag>
      }
      return <Checkbox defaultChecked={task.processStatus === 'Processing'} onChange={(e:any) => onProcessStatusChange(e, item)}>处理中</Checkbox>
    }

    if (checkedState === 'Processing' || checkedState === 'Completed') {
      return <Checkbox defaultChecked={task.processStatus === 'Completed'} onChange={(e:any) => onProcessStatusChange(e, item)}>已完成</Checkbox>
    }

    return null
  }

  const onSegmentedChange = (value: ProcessStatusType) => {
    const checked = value === 'New' ? '' : value
    setCheckedState(checked)
    setList(groupList(checked))
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <StatisticsTask />
      </Col>
      <Col span={24}>
        <Card>
          <Space size={16}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setModelOpen(true)}>创建任务</Button>
            <Segmented options={ProcessStatus} onChange={(value) => onSegmentedChange(value as '')} />
          </Space>
          <List
            dataSource={list}
            renderItem={(item:any) => {
            const [createDate, task] = item
            const [taskState] = TaskState.filter(e => task.level === e.value)
              return (
                <List.Item key={createDate + checkedState}>
                  <List.Item.Meta
                    title={
                      <Space>
                        {task.title}
                        <Tag color={taskState.color}>{taskState.label}</Tag>
                      </Space>
                    }
                    description={task.description}
                  />
                  <Space>
                    { CheckboxDom(task, item) }
                    {!checkedState && <Button type={'text'} size={'small'} danger icon={<DeleteOutlined />} onClick={() => removeTaskItem(createDate)}>删除</Button>}
                  </Space>
                </List.Item>
              )
            }} />
          </Card>
      </Col>
    </Row>
  )
}

export default TaskList