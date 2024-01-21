//
import DLG_GROUP from '../../../Group/GroupEnum';
//
import VueDlgWindowActionAlert from './VueDlgWindowActionAlert';

// action prompt
export default (dlgStoreObj) => ({
  success: ({ message }) => {
    const modalObj = dlgStoreObj.add(VueDlgWindowActionAlert, {
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
    const modalObj = dlgStoreObj.add(VueDlgWindowActionAlert, {
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
    const modalObj = dlgStoreObj.add(VueDlgWindowActionAlert, {
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
