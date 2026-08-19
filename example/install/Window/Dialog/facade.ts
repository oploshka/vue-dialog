import type { Component } from 'vue'
import type { ModalController, sModalSettings, tProps } from 'vue-dlg'
import { dialogConfig } from './config'

export const createDialogFacade = (controller: ModalController) => ({
  open(
    component: Component,
    props: tProps = {},
    options: sModalSettings = {},
  ) {
    return controller.open(component, props, {
      ...dialogConfig,
      ...options,
    })
  },
})
