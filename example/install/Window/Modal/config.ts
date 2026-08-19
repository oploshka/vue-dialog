import type { sModalSettings } from 'vue-dlg'
import ModalPresenter from './Presenter.vue'
import ModalWrapper from './Wrapper.vue'

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
