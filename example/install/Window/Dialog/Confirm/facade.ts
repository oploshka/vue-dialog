import type { Modal, ModalController } from 'vue-dlg'
import ConfirmItem from '@example/install/Window/Dialog/Confirm/Item.vue'
import {
  confirmActions,
  type tConfirmAction,
} from '@example/install/Window/Dialog/Confirm/action'
import { dialogConfig } from '@example/install/Window/Dialog/config'

export type tConfirmPositiveEvent = {
  action: 'OK'
}

export type tConfirmNegativeEvent = {
  action: 'CANCEL'
}

export interface sConfirmSettings {
  title?: string
  okLabel?: string
  cancelLabel?: string
  onPositive?: (event: tConfirmPositiveEvent) => void
  onNegative?: (event: tConfirmNegativeEvent) => void
}

export const createConfirmFacade = (controller: ModalController) => {
  const show = (
    action: tConfirmAction,
    message: string,
    settings: sConfirmSettings = {},
  ): Modal => {
    const actionConfig = confirmActions[action]
    let modal: Modal

    modal = controller.open(
      ConfirmItem,
      {
        action,
        title: settings.title ?? actionConfig.title,
        message,
        okLabel: settings.okLabel ?? 'Да',
        cancelLabel: settings.cancelLabel ?? 'Отмена',
        onPositive(event: tConfirmPositiveEvent) {
          settings.onPositive?.(event)
          modal.close()
        },
        onNegative(event: tConfirmNegativeEvent) {
          settings.onNegative?.(event)
          modal.close()
        },
      },
      dialogConfig,
    )

    return modal
  }

  return {
    add: (message: string, settings?: sConfirmSettings) => (
      show('add', message, settings)
    ),
    delete: (message: string, settings?: sConfirmSettings) => (
      show('delete', message, settings)
    ),
  }
}
