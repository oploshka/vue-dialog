import type { App } from 'vue'
import './style.scss'
import { facadeConfig as dialog } from './facadeConfig'

export { facadeConfig as dialog } from './facadeConfig'
export { layerConfig as layerEntries } from './layerConfig'
export { store } from './store'

export default {
  install(app: App): void {
    app.config.globalProperties.$dialog = dialog
    app.provide('dialog', dialog)
  },
}
