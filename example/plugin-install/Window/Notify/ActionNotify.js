
//
import DialogNotify from './TemplateDialogNotify';

const NotifyAction = (dlgStoreObj) => ({
  success: (title, message) => {
    const modalObj = dlgStoreObj.add(DialogNotify, {
        title: title,
        message: message,
        theme: 'success',
        onClose(event) { modalObj.close(); }
      },
      { group: 'notify' }
    );
    return modalObj;
  },
  warning: (title, message) => {
    const modalObj = dlgStoreObj.add(DialogNotify, {
        title: title,
        message: message,
        theme: 'warning',
        onClose(event) { modalObj.close(); }
      },
      { group: 'notify' }
    );
    return modalObj;
  },
  error: (title, message) => {
    const modalObj = dlgStoreObj.add(DialogNotify, {
        title: title,
        message: message,
        theme: 'error',
        onClose(event) { modalObj.close(); }
      },
      { group: 'notify' }
    );
    return modalObj;
  },
});

export default (action, dlgStoreObj) => {
  action.notify = NotifyAction(dlgStoreObj);
};
