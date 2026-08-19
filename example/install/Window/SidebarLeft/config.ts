import type { sModalSettings } from 'vue-dlg'
import SidebarLeftPresenter from '@example/install/Window/SidebarLeft/Presenter.vue'
import SidebarLeftWrapper from '@example/install/Window/SidebarLeft/Wrapper.vue'

export const sidebarLeftConfig: sModalSettings = {
  presenterComp: SidebarLeftPresenter,
  presenterProps: null,

  overlayComp: null,
  overlayProps: null,

  wrapComp: SidebarLeftWrapper,
  wrapProps: null,

  bridgeComp: null,
  bridgeProps: null,

  // closeOnEsc: false,
  // closeOnBackdrop: false,
}
