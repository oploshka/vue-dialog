import {
  ModalController,
  ModalLayout,
  NotificationController,
} from 'vue-dlg'
import NotificationLayout from '@example/install/Window/Notification/Layout.vue'

export const modalController = new ModalController()
export const notificationController = new NotificationController({
  maxVisible: 3,
  duration: 5000,
})

export const modalLayer = {
  manager: modalController,
  template: ModalLayout,
  lockBodyScroll: true,
}

export const notificationLayer = {
  manager: notificationController,
  template: NotificationLayout,
  lockBodyScroll: false,
}

export const layerConfig = [
  modalLayer,
  notificationLayer,
]
