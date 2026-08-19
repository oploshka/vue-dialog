import { ModalController } from 'vue-dlg/Layer/Modal/ModalController'
import { NotifyController } from 'vue-dlg/Layer/Notify/NotifyController'
import ModalLayout from 'vue-dlg/Layer/Modal/ModalLayout.vue'
import NotifyLayer from 'vue-dlg/Layer/Notify/NotifyLayer.vue'

const modalController = new ModalController(3000)
const notifyController = new NotifyController(5000)

window.addEventListener('popstate', () => {
  modalController.top?.close()
})

export const layers = {
  modal: modalController,
  notify: notifyController,
}

export const layerConfig = [
  { manager: modalController, template: ModalLayout },
  { manager: notifyController, template: NotifyLayer },
]
