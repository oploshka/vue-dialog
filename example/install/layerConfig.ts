import {
  ModalController,
  ModalLayout,
  NotificationController,
} from 'vue-dlg'
import NotificationLayout from './Window/Notification/Layout.vue'

export const modalController = new ModalController()
export const notificationController = new NotificationController({
  maxVisible: 3,
})

export const modalLayer = {
  manager: modalController,
  template: ModalLayout,
}

export const notificationLayer = {
  manager: notificationController,
  template: NotificationLayout,
}

export const layerConfig = [
  modalLayer,
  notificationLayer,
]
