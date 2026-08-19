import type { sModalSettings } from 'vue-dlg'
import ModalPresenter from '@example/install/Window/Modal/Presenter.vue'
import ModalWrapper from '@example/install/Window/Modal/Wrapper.vue'

export const modalConfig: sModalSettings = {
  presenterComp: ModalPresenter,
  presenterProps: null,

  overlayComp: null,
  overlayProps: null,

  wrapComp: ModalWrapper,
  wrapProps: null,

  bridgeComp: null,
  bridgeProps: null,
}
