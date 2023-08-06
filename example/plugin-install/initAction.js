
//
import DialogCardPrompt       from './Template/DialogCardPrompt';

import initActionAlert    from './initActionAlert';
import initActionConfirm  from './initActionConfirm';
import initActionNotify   from './initActionNotify';

export default (dlgStoreObj) => ({
  // modal
  alert:    initActionAlert(dlgStoreObj),
  confirm:  initActionConfirm(dlgStoreObj),

  prompt: ({ title = '', message= '', onSubmit= null }) => {
    const modal = dlgStoreObj.add(DialogCardPrompt, {
        title: title,
        message: message,
        theme: 'success',
        okLabel: 'Ok',
        cancelLabel: 'Отмена',
        onSubmit(event) {
          console.log('onSubmit', event);
          onSubmit && onSubmit(event);
          // props.onNegative && props.onNegative(event);
          modal.close();
        },
        onPositive(event) {
          // TODO: fix - всплытие лишнего события в компоненте DialogCardPrompt
          console.log('onPositive', event);
        },
        onNegative(event) {
          console.log('onNegative', event);
          // props.onNegative && props.onNegative(event);
          modal.close();
        }
      },
      { group: 'modal', theme: 'prompt' }
    );
    return modal;
  },
  notify: initActionNotify(dlgStoreObj),
});
