import type { App } from 'vue'
import './style.scss'
import { facadeConfig } from './facadeConfig'

export default {
  install(app: App): void {
    app.config.globalProperties.$dialog = facadeConfig
    app.provide('dialog', facadeConfig)
  },
}
