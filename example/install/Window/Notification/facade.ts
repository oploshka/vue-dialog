import type { NotificationController } from 'vue-dlg'
import NotificationItem from '@example/install/Window/Notification/Item.vue'
import type { tNotificationVariant } from '@example/install/Window/Notification/variant'

export const createNotificationFacade = (controller: NotificationController) => {
  const show = (
    title: string,
    message: string,
    variant: tNotificationVariant = 'info',
    duration?: number,
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
