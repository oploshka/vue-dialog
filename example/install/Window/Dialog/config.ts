import type { sModalSettings } from 'vue-dlg'
import ModalPresenter from '../Modal/Presenter.vue'
import DialogWrapper from './Wrapper.vue'

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
