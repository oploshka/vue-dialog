import type { sModalSettings } from 'vue-dlg'
import ModalPresenter from '../Modal/Presenter.vue'

export const dialogConfig: sModalSettings = {
  presenterComp: ModalPresenter,
  presenterProps: null,

  overlayComp: null,
  overlayProps: null,

  wrapComp: null,
  wrapProps: null,

  bridgeComp: null,
  bridgeProps: null,
}
