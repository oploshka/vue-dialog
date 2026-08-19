import { ModalLayout } from 'vue-dlg'
import { store } from './store'

export const modalLayer = {
  manager: store.modal,
  template: ModalLayout,
}

export const layerConfig = [
  modalLayer,
]
