
import { reactive, computed } from 'vue';
import DlgModalClass from 'vue-dlg/core/DlgModalClass.js';


const DlgStoreClass = function DlgStoreClass() {

  // Это необходимо для сохранения анимации удаления последнего элемента
  const openedGroup = {};
  this.getOpenedGroup = () => {
    return openedGroup;
  };

  //
  const modalListStore = reactive([]);


  this.add = (VueComponent, VueComponentProps, setting) => {
    // TODO: fix
    const modalCallbackFix = {
      open:  (modalObj) => { this.addModal(modalObj);    },
      close: (modalObj) => { this.removeModal(modalObj); },
    };
    const modalObj = new DlgModalClass(VueComponent, VueComponentProps, setting, modalCallbackFix);
    this.addModal(modalObj);
    return modalObj;
  };


  this.addModal = (modal) => {

    // запрет повторного добавления
    if(modalListStore.find(item => item.getId() === modal.getId())) {
      return;
    }

    const group = modal.getGroup();
    if(!openedGroup[group]) {
      openedGroup[group] = true;
    }

    modalListStore.push(modal);
  };

  this.removeModal = async (modal) => {
    try {
      // Защита от попыток множественного закрытия одного и того же окна
      if (!modal.getRemoveStatus()) {
        modal.setRemoveStatus(true);
      }

      let i = modalListStore.indexOf(modal);
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

        modalListStore.splice(i, 1);

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


};

export default DlgStoreClass;
