import { ModalController } from '@/Layer/Modal/ModalController'
import { NotifyController } from '@/Layer/Notify/NotifyController'
import ModalLayout from '@/Layer/Modal/ModalLayout.vue'
import NotifyLayer from '@/Layer/Notify/NotifyLayer.vue'

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
