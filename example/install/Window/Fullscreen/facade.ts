import type { Component } from 'vue'
import type { ModalController, sModalSettings, tProps } from 'vue-dlg'
import { fullscreenConfig } from './config'

export const createFullscreenFacade = (controller: ModalController) => ({
  open(
    component: Component,
    props: tProps = {},
    options: sModalSettings = {},
  ) {
    return controller.open(component, props, {
      ...fullscreenConfig,
      ...options,
    })
  },
})
