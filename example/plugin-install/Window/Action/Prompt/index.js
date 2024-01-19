//
import {DLG_GROUP_ACTION} from '../../../Group/GroupEnum';
//
import DialogBoxPromptDelete from './VueDlgWindowActionPromptText';

// action prompt
export default (dlgStoreObj) => ({
  text: ({ message, okLabel = 'Ok', cancelLabel = 'Отмена', onSubmit = null }) => {
    const modalObj = dlgStoreObj.add(
      DialogBoxPromptDelete,
      {
        title: 'Введите значение',
        message: message,
        okLabel: okLabel,
        cancelLabel: cancelLabel,
        onSubmit: (val) => {
          onSubmit && onSubmit(val);
        }
      },
      { group: DLG_GROUP_ACTION }
    );
    return modalObj;
  },
});
