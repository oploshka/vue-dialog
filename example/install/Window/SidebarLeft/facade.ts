import type { Component } from 'vue'
import type { ModalController, sModalSettings, tProps } from 'vue-dlg'
import { sidebarLeftConfig } from './config'

export const createSidebarLeftFacade = (controller: ModalController) => ({
  open(
    component: Component,
    props: tProps = {},
    options: sModalSettings = {},
  ) {
    return controller.open(component, props, {
      ...sidebarLeftConfig,
      ...options,
    })
  },
})
