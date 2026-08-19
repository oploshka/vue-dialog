import { ModalLayout } from 'vue-dlg'
import { store } from './store'

export const layerConfig = [
  {
    manager: store.modal,
    template: ModalLayout,
  },
]
