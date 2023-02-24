import { useState, useEffect } from 'react'
import { Row, Col, Calendar, Timeline, Button, Card, Segmented, Space, Typography, Badge, Tooltip } from 'antd'
import { useModel } from 'umi'
import dayjs, { Dayjs } from 'dayjs'
import { TaskState, LevelType } from '@/models/models.types'
const { Text } = Typography

const DayTask = () => {
  const { taskList, setModelOpen, getSetSelectDayTaskList, getIndexddbDataList } = useModel<any>('useCreateTaskModelOpen')
  const groupList = (level:LevelType): any[] => {
    const list: any = Array.from(taskList).filter((item: any) => {
      const [key, value] = item
      return value.level === level 
      && (value.processStatus === 'Processing' || value.processStatus === 'Completed')
    })
    return list
  }

  const [taskState, setTaskState] = useState<LevelType>('Normal')
  const [list, setList] = useState<any[]>([])
  useEffect(() => setList(groupList(taskState)), [taskList, taskState])

  const emptyPrompt = (taskState:LevelType) => {
    const [state] = TaskState.filter(item => item.value === taskState)
    return <Text>您还没有{state.label}的任务</Text>
  }
  
  let TaskList = [{
    children: (
      <Space>
        {emptyPrompt(taskState)}
        <Button type='link' onClick={() => setModelOpen(true)}>新建任务</Button>
      </Space>
    )
  }]

  if (list.length) {
    TaskList = list.map((item:any) => {
      const [date, value] = item
      const { processStatus, description } = value
      const [ task ] = TaskState.filter(e => e.value === value.level)
      return {
        color: processStatus === 'Completed' ? 'green' : task.color,
        children: (
          <Space direction='vertical'>
            <Text type='secondary'>{dayjs(Number(date)).format('YYYY-MM-DD HH:mm:ss')}</Text>
            <Text>{ description }</Text>
          </Space>
        )
      }
    })
  }

  const onSegmentedChange = (value: 'Normal' | 'Important' | 'Urgent') => {
    setList(groupList(value))
    setTaskState(value)
  }

  const onCalendarSelect = (date: Dayjs) => getSetSelectDayTaskList(date.format('YYYY-MM-DD'))
  
  const filterDayTaskList = (dayStr: string, allTaskList: [], state?: string) => {
    return allTaskList.filter((item: any) => {
      const [date, task] = item
      const dayConditionFilter = dayStr === dayjs(Number(date)).format('YYYY-MM-DD')
      if (state) {
        return dayConditionFilter && task.processStatus === state
      } 
      return dayConditionFilter
    })
  }

  const dateCellRender = (day: Dayjs, allTaskList: []) => {
    const dayStr = day.format('YYYY-MM-DD')
    const beingProcessedListLength = filterDayTaskList(dayStr, allTaskList, 'Completed').length === filterDayTaskList(dayStr, allTaskList).length
    const state = beingProcessedListLength ? 'success' : 'processing'
    const unCompletedNumber = filterDayTaskList(dayStr, allTaskList, 'Processing').length
    const numberTasks = filterDayTaskList(dayStr, allTaskList).length
    if (numberTasks) {
      return (
        <Tooltip
          placement='rightTop'
          title={`当天有${numberTasks}条任务，${unCompletedNumber ? `${unCompletedNumber}条任务正在进行` : `都已完成`} `}>
          <Badge status={state} />
        </Tooltip>
      )
    }
  }

  return (
    <Card>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Calendar dateCellRender={(day:Dayjs) => dateCellRender(day, getIndexddbDataList())} fullscreen={false} onSelect={onCalendarSelect} />
        </Col>
        <Col span={24}><Segmented block options={TaskState} onChange={(value) => onSegmentedChange(value as 'Normal')} /></Col>
        <Col span={24}>
          <Timeline items={TaskList} />
        </Col>
      </Row>
    </Card>
  )
}

export default DayTask