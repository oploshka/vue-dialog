import type { sModalSettings } from 'vue-dlg'
import ModalPresenter from './Presenter.vue'

export const modalConfig: sModalSettings = {
  presenterComp: ModalPresenter,
  presenterProps: null,

  overlayComp: null,
  overlayProps: null,

  wrapComp: null,
  wrapProps: null,

  bridgeComp: null,
  bridgeProps: null,
}
