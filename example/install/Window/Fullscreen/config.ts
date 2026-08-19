import type { sModalSettings } from 'vue-dlg'
import FullscreenPresenter from '@example/install/Window/Fullscreen/Presenter.vue'
import FullscreenWrapper from '@example/install/Window/Fullscreen/Wrapper.vue'

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
