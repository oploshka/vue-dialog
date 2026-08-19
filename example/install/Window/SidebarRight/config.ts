import type { sModalSettings } from 'vue-dlg'
import SidebarRightPresenter from '@example/install/Window/SidebarRight/Presenter.vue'
import SidebarRightWrapper from '@example/install/Window/SidebarRight/Wrapper.vue'

export const sidebarRightConfig: sModalSettings = {
  presenterComp: SidebarRightPresenter,
  presenterProps: null,

  overlayComp: null,
  overlayProps: null,

  wrapComp: SidebarRightWrapper,
  wrapProps: null,

  bridgeComp: null,
  bridgeProps: null,
}
