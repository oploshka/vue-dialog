import type { Component } from 'vue'
import type { ModalController, sModalSettings, tProps } from 'vue-dlg'
import { modalConfig } from '@example/install/Window/Modal/config'

export const createModalFacade = (controller: ModalController) => ({
  open(
    component: Component,
    props: tProps = {},
    options: sModalSettings = {},
  ) {
    return controller.open(component, props, {
      ...modalConfig,
      ...options,
    })
  },
})
