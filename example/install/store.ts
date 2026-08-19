import { reactive } from 'vue'
import { ModalController } from 'vue-dlg'

export const store = {
  modal: reactive(new ModalController()) as ModalController,
}
