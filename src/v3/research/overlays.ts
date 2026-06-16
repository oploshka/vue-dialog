// ← фабрика (глобальный singleton)
import { ModalStack } from './ModalStack'
import { NotificationQueue } from './NotificationQueue'
import ModalLayer from './ModalLayer.vue'
import NotificationLayer from './NotificationLayer.vue'
import { resolveWrapper } from './wrapperRegistry'
import type { WrapperConfig } from './types'

const modalStack = new ModalStack(3000)
const notificationQueue = new NotificationQueue(5000)

// ----------------------------------------------------------
// Кастомные врапперы (переопределение по умолчанию)
// ----------------------------------------------------------
const customWrappers: Record<string, WrapperConfig> = {
  // 'modal': { component: MyCustomModal, hasOverlay: true },
}

export function getWrapper(type: string): WrapperConfig | undefined {
  return customWrappers[type] ?? resolveWrapper(type)
}

// ----------------------------------------------------------
// popstate: браузерный back → закрыть верхнюю модалку
// ----------------------------------------------------------
window.addEventListener('popstate', () => {
  if (modalStack.items.length > 0) {
    modalStack.close()
  }
})

// ----------------------------------------------------------
// Экспорт
// ----------------------------------------------------------
export const overlays = {
  modal: modalStack,
  notify: notificationQueue,
}

export const layerConfig = [
  { manager: modalStack, template: ModalLayer },
  { manager: notificationQueue, template: NotificationLayer },
]