//
import DLG_GROUP from '../../../Group/GroupEnum';
//
import VueDlgWindowActionConfirm from './VueDlgWindowActionConfirm';

// action confirm
export default (dlgStoreObj) => ({
  add({ message, onPositive = null, onNegative = null }) {
    const modalObj = dlgStoreObj.add(
      VueDlgWindowActionConfirm,
      {
        title: 'Подтвердите добавление',
        message: message,
        okLabel: 'Да',
        cancelLabel: 'Отмена', // options && options.cancelLabel ? options.cancelLabel :
        theme: 'success',
        onPositive() {
          onPositive && onPositive();
          modalObj.close();
        },
        onNegative() {
          onNegative && onNegative();
          modalObj.close();
        },
        onClose() { modalObj.close(); }
      },
      { group: DLG_GROUP.ACTION }
    );
    return modalObj;
  },

  delete({ message, onPositive = null, onNegative = null }) {
    const modalObj = dlgStoreObj.add(
      VueDlgWindowActionConfirm,
      {
        title: 'Подтвердите удаление',
        message: message,
        okLabel: 'Да',
        cancelLabel: 'Отмена', // options && options.cancelLabel ? options.cancelLabel :
        theme: 'error',
        onPositive() {
          onPositive && onPositive();
          modalObj.close();
        },
        onNegative() {
          onNegative && onNegative();
          modalObj.close();
        },
        onClose() { modalObj.close(); }
      },
      { group: DLG_GROUP.ACTION }
    );
    return modalObj;
  },
});
