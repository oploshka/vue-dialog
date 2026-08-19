import type { Modal, ModalController } from 'vue-dlg'
import PromptItem from '@example/install/Window/Dialog/Prompt/Item.vue'
import {
  promptActions,
  type tPromptChoiceItem,
  type tPromptValue,
} from '@example/install/Window/Dialog/Prompt/action'
import { dialogConfig } from '@example/install/Window/Dialog/config'

export type tPromptSubmitEvent = {
  action: 'OK'
  value: tPromptValue
}

export type tPromptCancelEvent = {
  action: 'CANCEL'
}

export interface sPromptSettings {
  title?: string
  okLabel?: string
  cancelLabel?: string
  onSubmit?: (event: tPromptSubmitEvent) => void
  onCancel?: (event: tPromptCancelEvent) => void
}

export interface sPromptChoiceSettings extends sPromptSettings {
  message?: string
}

export type {
  tPromptChoiceItem,
  tPromptValue,
}

export const createPromptFacade = (controller: ModalController) => {
  const text = (
    message: string,
    settings: sPromptSettings = {},
  ): Modal => {
    const actionConfig = promptActions.text
    let modal: Modal

    modal = controller.open(
      PromptItem,
      {
        action: 'text',
        title: settings.title ?? actionConfig.title,
        message,
        okLabel: settings.okLabel ?? 'Да',
        cancelLabel: settings.cancelLabel ?? 'Отмена',
        onPositive(event: tPromptSubmitEvent) {
          settings.onSubmit?.(event)
          modal.close()
        },
        onNegative(event: tPromptCancelEvent) {
          settings.onCancel?.(event)
          modal.close()
        },
      },
      dialogConfig,
    )

    return modal
  }

  const choice = (
    list: tPromptChoiceItem[],
    settings: sPromptChoiceSettings = {},
  ): Modal => {
    const actionConfig = promptActions.choice
    let modal: Modal

    modal = controller.open(
      PromptItem,
      {
        action: 'choice',
        title: settings.title ?? actionConfig.title,
        message: settings.message ?? '',
        list,
        okLabel: settings.okLabel ?? 'Да',
        cancelLabel: settings.cancelLabel ?? 'Отмена',
        onPositive(event: tPromptSubmitEvent) {
          settings.onSubmit?.(event)
          modal.close()
        },
        onNegative(event: tPromptCancelEvent) {
          settings.onCancel?.(event)
          modal.close()
        },
      },
      dialogConfig,
    )

    return modal
  }

  return {
    text,
    choice,
  }
}
