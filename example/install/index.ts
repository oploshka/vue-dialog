import type { App } from 'vue'
import './style.scss'
import { dialog } from './dialog'

export { dialog } from './dialog'
export { layerConfig as layerEntries } from './layerConfig'
export { store } from './store'

export default {
  install(app: App): void {
    app.config.globalProperties.$dialog = dialog
    app.provide('dialog', dialog)
  },
}
