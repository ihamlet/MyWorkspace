const TaskState = [{
  label: '一般',
  value: 'Normal',
  color: 'blue'
}, {
  label: '重要',
  value: 'Important',
  color: 'purple'
}, {
  label: '紧急',
  value: 'Urgent',
  color: 'red'
}]

const ProcessStatus = [{
  label: '新创建',
  value: 'New'
}, {
  label: '处理中',
  value: 'Processing'
}, {
  label: '已完成',
  value: 'Completed'
}]

type LevelType =  'Normal' | 'Important' | 'Urgent'
type ProcessStatusType = 'New' | 'Processing' | 'Completed' | ''
type Task = {
  title: string
  level: LevelType
  description: string
  processStatus: ProcessStatusType
}

type UseTask = {
  filterTaskType: Function
  getIndexddbDataList: Function
  getSetSelectDayTaskList: Function
  removeTaskItem: Function
  setTaskState:Function
  setCreateForm: Function
  isOpen: Boolean
  setModelOpen: Function
  taskList: any
  confirm: Function
}

type UseConfig = {
  isDarkTheme: Boolean
  changeTheme: Function
  themeConfig: object
  zhCN: any
  setThemeConfig: Function
}

export {
  ProcessStatus,
  TaskState,
  Task,
  UseTask,
  UseConfig,
  LevelType,
  ProcessStatusType
}