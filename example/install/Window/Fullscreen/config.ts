import type { sModalSettings } from 'vue-dlg'
import FullscreenPresenter from './Presenter.vue'
import FullscreenWrapper from './Wrapper.vue'

export const fullscreenConfig: sModalSettings = {
  presenterComp: FullscreenPresenter,
  presenterProps: null,

  overlayComp: null,
  overlayProps: null,

  wrapComp: FullscreenWrapper,
  wrapProps: null,

  bridgeComp: null,
  bridgeProps: null,

  closeOnBackdrop: false,
}
