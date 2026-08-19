import { ModalController, ModalLayout } from 'vue-dlg'

export const modalController = new ModalController()

export const modalLayer = {
  manager: modalController,
  template: ModalLayout,
}

export const layerConfig = [
  modalLayer,
]
