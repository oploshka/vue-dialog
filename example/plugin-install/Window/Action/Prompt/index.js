//
import DLG_GROUP from '../../../Group/GroupEnum.js';
//
import DialogBoxPromptDelete from './DlgWindowActionPromptText.vue';

// action prompt
export default (dlgStoreObj) => ({
  text: ({ message, onPositive = null, onNegative = null }) => {
    const modalObj = dlgStoreObj.add(
      DialogBoxPromptDelete,
      {
        title: 'Подтвердите действие',
        message: message,
        okLabel: 'Да',
        cancelLabel: 'Отмена',
        theme: 'success',
        
        onPositive() {
          onPositive && onPositive();
          modalObj.close(this);
        },
        onNegative() {
          onNegative && onNegative();
          modalObj.close(this);
        },
        onClose() { modalObj.close(this); }
      },
      { group: DLG_GROUP.ACTION }
    );
    return modalObj;
  },
});
