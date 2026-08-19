import type { NotificationController } from 'vue-dlg'
import NotificationItem from './Item.vue'
import type { tNotificationVariant } from './variant'

export const createNotificationFacade = (controller: NotificationController) => {
  const show = (
    title: string,
    message: string,
    variant: tNotificationVariant = 'info',
    duration: number = 5000,
  ) => controller.show(
    NotificationItem,
    { title, message, variant },
    { duration },
  )

  return {
    show,
    info: (title: string, message: string, duration?: number) => (
      show(title, message, 'info', duration)
    ),
    success: (title: string, message: string, duration?: number) => (
      show(title, message, 'success', duration)
    ),
    warning: (title: string, message: string, duration?: number) => (
      show(title, message, 'warning', duration)
    ),
    error: (title: string, message: string, duration?: number) => (
      show(title, message, 'error', duration)
    ),
  }
}
