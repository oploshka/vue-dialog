
//
import DialogBox              from './Template/DialogBox';

export default (dlgStoreObj) => ({
  success: (message, props = {}) => {
    const modalObj = dlgStoreObj.add(DialogBox, {
        title: 'Успешно',
        message: message,
        okLabel: 'Ok',
        theme: 'success',
        onPositive(event) {
          props.onPositive && props.onPositive(event);
          modalObj.close();
        },
        onClose(event) { modalObj.close(); }
      },
      { group: 'modal' }
    );
  },
  warning: (message, props = {}) => {
    const modalObj = dlgStoreObj.add(DialogBox, {
        title: 'Предупреждение',
        message: message,
        okLabel: 'Ok',
        theme: 'warning',
        onPositive(event) {
          props.onPositive && props.onPositive(event);
          modalObj.close();
        },
        onClose(event) { modalObj.close(); }
      },
      { group: 'modal' }
    );
    return modalObj;
  },
  error: (message, props = {}) => {
    const modalObj = dlgStoreObj.add(DialogBox, {
        title: 'Ошибка',
        message: message,
        okLabel: 'Ok',
        theme: 'error',
        onPositive(event) {
          props.onPositive && props.onPositive(event);
          modalObj.close();
        },
        onClose(event) { modalObj.close(); }
      },
      { group: 'modal' }
    );
    return modalObj;
  },
});
