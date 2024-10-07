//
import DLG_GROUP from '../../../Group/GroupEnum';
//
import DialogBoxPromptDelete from './DlgWindowActionPromptText';

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
