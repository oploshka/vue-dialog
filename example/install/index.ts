import { reactive, type App } from 'vue'
import { ModalController, ModalLayout } from 'vue-dlg'
import './style.scss'
import { facadeConfig } from './facadeConfig'
import { layerConfig } from './layerConfig'

const modalLayerConfig = layerConfig.modal ?? {}

export const modalController = reactive(
  new ModalController(modalLayerConfig.zIndex ?? undefined),
) as ModalController

export const layerEntries = [
  {
    manager: modalController,
    template: modalLayerConfig.layout ?? ModalLayout,
  },
]

export const dialog = Object.fromEntries(
  Object.entries(facadeConfig).map(([name, createFacade]) => [
    name,
    createFacade(modalController),
  ]),
)

export default {
  install(app: App): void {
    app.config.globalProperties.$dialog = dialog
    app.provide('dialog', dialog)
  },
}
