import type { Modal, ModalController } from 'vue-dlg'
import ConfirmItem from './Item.vue'
import {
  confirmActions,
  type tConfirmAction,
  type tConfirmChoiceItem,
  type tConfirmChoiceValue,
} from './action'
import { dialogConfig } from '../config'

export type tConfirmPositiveEvent = {
  action: 'OK'
}

export type tConfirmNegativeEvent = {
  action: 'CANCEL'
}

export type tConfirmChoicePositiveEvent = {
  action: 'OK'
  inputValue: tConfirmChoiceValue
}

export interface sConfirmSettings {
  title?: string
  okLabel?: string
  cancelLabel?: string
  onPositive?: (event: tConfirmPositiveEvent) => void
  onNegative?: (event: tConfirmNegativeEvent) => void
}

export interface sConfirmChoiceSettings {
  title?: string
  okLabel?: string
  cancelLabel?: string
  onPositive?: (event: tConfirmChoicePositiveEvent) => void
  onNegative?: (event: tConfirmNegativeEvent) => void
}

export type {
  tConfirmChoiceItem,
  tConfirmChoiceValue,
}

export const createConfirmFacade = (controller: ModalController) => {
  const showMessage = (
    action: Exclude<tConfirmAction, 'choice'>,
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

  const choice = (
    list: tConfirmChoiceItem[],
    settings: sConfirmChoiceSettings = {},
  ): Modal => {
    const actionConfig = confirmActions.choice
    let modal: Modal

    modal = controller.open(
      ConfirmItem,
      {
        action: 'choice',
        title: settings.title ?? actionConfig.title,
        list,
        okLabel: settings.okLabel ?? 'Да',
        cancelLabel: settings.cancelLabel ?? 'Отмена',
        onPositive(event: tConfirmChoicePositiveEvent) {
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
      showMessage('add', message, settings)
    ),
    choice,
    delete: (message: string, settings?: sConfirmSettings) => (
      showMessage('delete', message, settings)
    ),
  }
}
