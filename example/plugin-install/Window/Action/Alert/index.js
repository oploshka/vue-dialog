//
import DLG_GROUP from '../../../Group/GroupEnum';
//
import DlgWindowActionAlert from './DlgWindowActionAlert';

// action prompt
export default (dlgStoreObj) => ({
  success: ({ message }) => {
    const modalObj = dlgStoreObj.add(DlgWindowActionAlert, {
        title: 'Успешно',
        message: message,
        okLabel: 'Ok',
        theme: 'success',
        onPositive(event) {
          // props.onPositive && props.onPositive(event);
          modalObj.close();
        },
        onClose(event) { modalObj.close(); }
      },
      { group: DLG_GROUP.ACTION }
    );
    return modalObj;
  },
  warning: ({ message }) => {
    const modalObj = dlgStoreObj.add(DlgWindowActionAlert, {
        title: 'Предупреждение',
        message: message,
        okLabel: 'Ok',
        theme: 'warning',
        onPositive(event) {
          // props.onPositive && props.onPositive(event);
          modalObj.close();
        },
        onClose(event) { modalObj.close(); }
      },
      { group: DLG_GROUP.ACTION }
    );
    return modalObj;
  },
  error: ({ message }) => {
    const modalObj = dlgStoreObj.add(DlgWindowActionAlert, {
        title: 'Ошибка',
        message: message,
        okLabel: 'Ok',
        theme: 'error',
        onPositive(event) {
          // props.onPositive && props.onPositive(event);
          modalObj.close();
        },
        onClose(event) { modalObj.close(); }
      },
      { group: DLG_GROUP.ACTION }
    );
    return modalObj;
  },
});
