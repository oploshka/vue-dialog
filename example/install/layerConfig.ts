import {
  ModalController,
  ModalLayout,
  NotificationController,
  type sLayerEntry,
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
  trapFocus: true,
}

export const notificationLayer = {
  manager: notificationController,
  template: NotificationLayout,
  lockBodyScroll: false,
  trapFocus: false,
}

export const layerConfig: sLayerEntry[] = [
  modalLayer,
  notificationLayer,
]
