import type { sModalSettings } from 'vue-dlg'
import SidebarLeftPresenter from './Presenter.vue'
import SidebarLeftWrapper from './Wrapper.vue'

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
