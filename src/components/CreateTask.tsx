
import { useEffect } from 'react'
import { Form, Input, Select, Badge } from 'antd'
import { useModel } from 'umi'
import { TaskState } from '@/models/models.types'

const CreateTask = () => {
  const transactionLevel = TaskState.map(item => {
    return {
      label: <Badge color={item.color} text={item.label} />,
      value: item.value
    }
  })
  
  const [form] = Form.useForm()
  const { setCreateForm } = useModel<any>('useTask')
  useEffect(() => setCreateForm(form), [])

  return (
    <Form name='create-task' form={form}>
      <Form.Item rules={[{ required: true, message: '请输入任务标题' }]} name='title'>
        <Input placeholder='请输入任务标题'  allowClear />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: '请选择事务等级' }]} name='level'>
        <Select options={transactionLevel} placeholder='请选择事务等级' allowClear />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: '请输入任务描述' }]} name='description'>
        <Input.TextArea rows={6} placeholder='请输入任务描述' allowClear />
      </Form.Item>
    </Form>
  )
}

export default CreateTask