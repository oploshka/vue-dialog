// Overlays.ts

import { ModalController } from './Layer/Modal/ModalController'
import { NotifyController } from './Layer/Notify/NotifyController'
import ModalLayer from './Layer/Modal/ModalLayer.vue'
import NotifyLayer from './Layer/Notify/NotifyLayer.vue'
import { resolveWrapper } from './WrapperRegistry'
import type { sWrapperConfig } from './Type/Type'

const modalController = new ModalController(3000)
const notifyController = new NotifyController(5000)

// ----------------------------------------------------------
// Кастомные врапперы
// ----------------------------------------------------------
const customWrappers: Record<string, sWrapperConfig> = {}

export function getWrapper(type: string): sWrapperConfig | undefined {
  return customWrappers[type] ?? resolveWrapper(type)
}

// ----------------------------------------------------------
// popstate
// ----------------------------------------------------------
window.addEventListener('popstate', () => {
  if (modalController.items.length > 0) {
    modalController.close()
  }
})

// ----------------------------------------------------------
// Экспорт
// ----------------------------------------------------------
export const overlays = {
  modal: modalController,
  notify: notifyController,
}

export const layerConfig = [
  { manager: modalController, template: ModalLayer },
  { manager: notifyController, template: NotifyLayer },
]