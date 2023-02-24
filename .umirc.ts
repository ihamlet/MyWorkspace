import { defineConfig } from "umi"

export default defineConfig({
  plugins: [
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/antd'
  ],
  base: '/MyWorkspace',
  model: {},
  antd: {},
  routes: [
    { path: "/", component: "index" }
  ],
  npmClient: 'pnpm'
})
