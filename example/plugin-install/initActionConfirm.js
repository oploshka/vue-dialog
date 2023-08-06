
//
import DialogBox              from './Template/DialogBox';

export default (dlgStoreObj) => ({
  add: (title, message, props = {}) => {
    const modalObj = dlgStoreObj.add(DialogBox, {
        title: title,
        message: message,
        theme: 'primary',
        okLabel: props.okLabel ? props.okLabel : 'Ok',
        cancelLabel: props.cancelLabel ? props.cancelLabel : 'Отмена',
        onPositive(event) {
          props.onPositive && props.onPositive(event);
          modalObj.close();
        },
        onNegative(event) {
          props.onNegative && props.onNegative(event);
          modalObj.close();
        }
      },
      { group: 'modal' }
    );
    return modalObj;
  },

  delete: (title, message, props = {}) => {
    const modalObj = dlgStoreObj.add(DialogBox, {
        title: title,
        message: message || '',
        theme: 'error',
        okLabel: props.okLabel ? props.okLabel : 'Delete',
        cancelLabel: props.cancelLabel ? props.cancelLabel : 'Discard',
        onPositive(event) {
          props.onPositive && props.onPositive(event);
          modalObj.close();
        },
        onNegative(event) {
          props.onNegative && props.onNegative(event);
          modalObj.close();
        }
      },
      { group: 'modal', theme: 'delete' }
    );
    return modalObj;
  },
});
