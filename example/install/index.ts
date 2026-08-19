import type { App } from 'vue'
import '@example/install/style.scss'
import { facadeConfig } from '@example/install/facadeConfig'

export default {
  install(app: App): void {
    app.config.globalProperties.$dialog = facadeConfig
    app.provide('dialog', facadeConfig)
  },
}
