
import { reactive, computed } from 'vue';
import type {iDlgModal, iDlgModalManager, iDlgModalManagerCallback, tDlgModalConfig} from "vue-dlg/v2/Type/tDlg.ts";
import DlgModal from './DlgModal';

export class DlgModalManager implements iDlgModalManager {

  //
  private modalListStore = reactive<iDlgModal[]>([]);
  // Это необходимо для сохранения анимации удаления последнего элемента
  private openedGroup = {} as Record<string, boolean>;

  //
  constructor() {
    //
  }

  getOpenedGroup() { return this.openedGroup; };
  getModalListStore () { return this.modalListStore; };

  private getModalManagerCallback(): iDlgModalManagerCallback {
    return {
      open: this.addModal,
      close: this.removeModal,
    };
  }

  add(config: tDlgModalConfig): iDlgModal {
    const modalObj = new DlgModal(config, this.getModalManagerCallback());
    this.addModal(modalObj);
    return modalObj;
  };


  addModal(modal: iDlgModal) {

    // запрет повторного добавления
    if(this.modalListStore.find(item => item.getId() === modal.getId())) {
      return;
    }

    const group = modal.getGroup();
    if(!this.openedGroup[group]) {
      this.openedGroup[group] = true;
    }

    this.modalListStore.push(modal);
  };

  removeModal = async (modal: iDlgModal) => {
    try {
      // Защита от попыток множественного закрытия одного и того же окна
      if (!modal.getRemoveStatus()) {
        modal.setRemoveStatus(true);
      }

      let i = this.modalListStore.indexOf(modal);
      if (i >= 0) {

        // событие перед закрытием (закрытие может не отработать если изменить closeIsCanceled)
        const callbackBeforeClose = modal.getCallbackBeforeClose();
        if (callbackBeforeClose) {
          await callbackBeforeClose();
        }

        // TODO: Продумать
        const closeIsCanceled = modal.getCloseIsCancelled();
        if (!!closeIsCanceled) {
          modal.setRemoveStatus(false);
          return;
        }

        this.modalListStore.splice(i, 1);

        // произошло событие закрытия.
        const callbackClose = modal.getCallbackClose();
        callbackClose && callbackClose();
      }

    } catch (e) {
      console.error(e);
    } finally {
      modal.setRemoveStatus(false);
    }

  };

}

