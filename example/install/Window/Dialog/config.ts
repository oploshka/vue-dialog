import type { sModalSettings } from 'vue-dlg'
import ModalPresenter from '@example/install/Window/Modal/Presenter.vue'
import DialogWrapper from '@example/install/Window/Dialog/Wrapper.vue'

export const dialogConfig: sModalSettings = {
  presenterComp: ModalPresenter,
  presenterProps: null,

  overlayComp: null,
  overlayProps: null,

  wrapComp: DialogWrapper,
  wrapProps: null,

  bridgeComp: null,
  bridgeProps: null,
}
