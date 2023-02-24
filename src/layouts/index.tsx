import { Outlet, useModel } from 'umi'
import { ConfigProvider, Layout, Modal } from 'antd'
import HeaderBar from '@/components/HeaderBar'
import FooterBar from '@/components/FooterBar'
import CreateTask from '@/components/CreateTask'
const { Header, Content, Footer } = Layout

const Layouts = () => {
  const { isOpen, setModelOpen, confirm } = useModel<any>('useCreateTaskModelOpen') as any
  const { themeConfig, zhCN } = useModel<any>('useLayoutsConfig') as any

  return (
    <ConfigProvider locale={zhCN} theme={themeConfig} prefixCls='my'>
      <Layout>
        <Header><HeaderBar /></Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>
          <FooterBar />
        </Footer>
      </Layout>
      <Modal title='创建任务' open={isOpen as false} onCancel={() => setModelOpen(false)} onOk={() => confirm()}>
        <CreateTask />
      </Modal>
    </ConfigProvider>
  )
}

export default Layouts