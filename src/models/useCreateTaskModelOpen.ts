import { useState } from 'react'
import { useMap } from 'ahooks'
import { Task, UseTask } from './models.types'
import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
import dayjs, { Dayjs } from 'dayjs'

const doc = new Y.Doc()
const ymap = doc.getMap('task')
const provider = new IndexeddbPersistence('task', doc)

const useTask = (): UseTask => {
  const currentDay = dayjs(Date.now()).format('YYYY-MM-DD')
  const [createForm, setCreateForm] = useState<any>()
  const [isOpen, setModelOpen] = useState<Boolean>(false)
  const [taskList, { set, setAll, remove }] = useMap<string | number, Task | any>([])
  const [time, setTime] = useState<string>(String(Date.now()))
  
  // 拿到当天数据，可根据日历进行筛选
  const getCurrentDayTaskList = (taskList: any, selectDay: string = currentDay) => {
    setTime(String(dayjs(selectDay).valueOf()))
    return taskList.filter((item: any) => {
      const [createTime] = item
      const dateStr = dayjs(Number(createTime)).format('YYYY-MM-DD')
      return dateStr === selectDay
    })
  }

  // 获取indexDB数据
  const getIndexddbDataList = ():any[] => {
    const list = Array.from(ymap._map).map((item: any) => {
      const [createTime, doc] = item
      if (doc.content?.arr) {
        const [ formData] = doc.content.arr
        return [createTime, formData]
      } else {
        return null
      }
    }).filter(Boolean)

    return list.sort((a:any, b:any) => {
      const [createTimeA] = a
      const [createTimeB] = b
      return createTimeA - createTimeB
    })
  }

  provider.on('synced', () => {
    const taskDB: any = getIndexddbDataList()
    setAll(getCurrentDayTaskList(taskDB))
  })

  // 设置Task
  const setTaskState = (state: { key: string, value: any }) => {
    const { key, value } = state
    set(key, value)
    ymap.set(key, value)
  }

  // 删除Task
  const removeTaskItem = (key: string) => {
    remove(key)
    ymap.delete(key)
  }

  // 创建task
  const confirm = async () => {
    const formData:Task = await createForm.validateFields()
    if (formData) {
      set(time, formData)
      ymap.set(time, formData)
      setModelOpen(false)
    }
  }

  // 日期选择
  const getSetSelectDayTaskList = (daystr: string) => setAll(getCurrentDayTaskList(getIndexddbDataList(), daystr))

  const filterTaskType = (type: 'Urgent' | 'Important' | 'Todo' | 'completionRate') => {
    const taskList = getIndexddbDataList()
    const filterListFunc = (keyType: 'level' | 'Todo' | 'completionRate') => {
      if (keyType !== 'completionRate') {
        return taskList.filter(item => {
          const [timer, obj] = item
          if (keyType === 'level') {
            return obj[keyType] === type && obj.processStatus !== 'Completed'
          }

          if (keyType === 'Todo') {
            return obj.processStatus !== 'Completed'
          }
        }).length
      }

      const completedTaskListLen = taskList.filter(item => {
        const [timer, obj] = item
        return obj.processStatus === 'Completed'
      }).length

      return (completedTaskListLen / taskList.length) * 100
    }

    const comparer = {
      'Urgent': filterListFunc('level'),
      'Important': filterListFunc('level'),
      'Todo': filterListFunc('Todo'),
      'completionRate': filterListFunc('completionRate')
    }
    
    return comparer[type]
  }

  return {
    filterTaskType,
    getIndexddbDataList,
    getSetSelectDayTaskList,
    removeTaskItem,
    setTaskState,
    setCreateForm,
    isOpen,
    setModelOpen,
    taskList,
    confirm
  }
}

export default useTask