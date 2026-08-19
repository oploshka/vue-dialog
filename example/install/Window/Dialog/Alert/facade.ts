import type { Modal, ModalController } from 'vue-dlg'
import AlertItem from '@example/install/Window/Dialog/Alert/Item.vue'
import {
  alertVariants,
  type tAlertVariant,
} from '@example/install/Window/Dialog/Alert/variant'
import { dialogConfig } from '@example/install/Window/Dialog/config'

export type tAlertPositiveEvent = {
  action: 'OK'
}

export interface sAlertSettings {
  title?: string
  okLabel?: string
  closeBtn?: boolean
  onPositive?: (event: tAlertPositiveEvent) => void
}

export const createAlertFacade = (controller: ModalController) => {
  const show = (
    variant: tAlertVariant,
    message: string,
    settings: sAlertSettings = {},
  ): Modal => {
    const variantConfig = alertVariants[variant]
    let modal: Modal

    modal = controller.open(
      AlertItem,
      {
        variant,
        title: settings.title ?? variantConfig.title,
        message,
        okLabel: settings.okLabel ?? 'OK',
        closeBtn: settings.closeBtn ?? true,
        onPositive(event: tAlertPositiveEvent) {
          settings.onPositive?.(event)
          modal.close()
        },
        onClose() {
          modal.close()
        },
      },
      dialogConfig,
    )

    return modal
  }

  return {
    show,
    success: (message: string, settings?: sAlertSettings) => (
      show('success', message, settings)
    ),
    warning: (message: string, settings?: sAlertSettings) => (
      show('warning', message, settings)
    ),
    error: (message: string, settings?: sAlertSettings) => (
      show('error', message, settings)
    ),
  }
}
