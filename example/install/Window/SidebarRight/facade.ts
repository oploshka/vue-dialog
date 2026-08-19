import type { Component } from 'vue'
import type { ModalController, sModalSettings, tProps } from 'vue-dlg'
import { sidebarRightConfig } from '@example/install/Window/SidebarRight/config'

export const createSidebarRightFacade = (controller: ModalController) => ({
  open(
    component: Component,
    props: tProps = {},
    options: sModalSettings = {},
  ) {
    return controller.open(component, props, {
      ...sidebarRightConfig,
      ...options,
    })
  },
})
