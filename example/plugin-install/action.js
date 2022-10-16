
import VueDlgThinClient from 'vue-dlg/src/VueDlgThinClient';

import DialogBox              from './Template/DialogBox';
import DialogNotify           from './Template/DialogNotify';
// import DialogBoxPromptDelete  from './Template/DialogBoxPromptDelete';

export default {
  open: VueDlgThinClient, // function (VueComponent, VueComponentProps, groupName, setting)
  
  alert: {
    success: (message, props = {}) => {
      const modal = VueDlgThinClient(
        DialogBox,
        {
          title: 'Успешно',
          message: message,
          okLabel: 'Ok',
          theme: 'success',
          onPositive(event) {
            props.onPositive && props.onPositive(event);
            modal.close();
          }
        },
        { group: 'modal' }
      );
      return modal;
    },
    warning: (message, props = {}) => {
      const modal = VueDlgThinClient(
        DialogBox,
        {
          title: 'Предупреждение',
          message: message,
          okLabel: 'Ok',
          theme: 'warning',
          onPositive(event) {
            props.onPositive && props.onPositive(event);
            modal.close();
          }
        },
        { group: 'modal' }
      );
      return modal;
    },
    error: (message, props = {}) => {
      const modal = VueDlgThinClient(
        DialogBox,
        {
          title: 'Ошибка',
          message: message,
          okLabel: 'Ok',
          theme: 'error',
          onPositive(event) {
            props.onPositive && props.onPositive(event);
            modal.close();
          }
        },
        { group: 'modal' }
      );
      return modal;
    },
  },

  confirm: {
    // TODO: продумать о том чтоб использовать везде один объект
    add: (title, message, props = {}) => {
      const modal = VueDlgThinClient(
        DialogBox,
        {
          title: title,
          message: message,
          okLabel: props.okLabel ? props.okLabel : 'Ok',
          cancelLabel: props.cancelLabel ? props.cancelLabel : 'Отмена',
          onPositive(event) {
            props.onPositive && props.onPositive(event);
            modal.close();
          },
          onNegative(event) {
            props.onNegative && props.onNegative(event);
            modal.close();
          }
        },
        { group: 'modal' }
      );
      return modal;
    },

    delete: (title, message, props = {}) => {
      const modal = VueDlgThinClient(
        DialogBox,
        {
          title: title,
          message: message || '',
          okLabel: props.okLabel ? props.okLabel : 'Delete',
          cancelLabel: props.cancelLabel ? props.cancelLabel : 'Discard',
          onPositive(event) {
            props.onPositive && props.onPositive(event);
            modal.close();
          },
          onNegative(event) {
            props.onNegative && props.onNegative(event);
            modal.close();
          }
        },
        { group: 'modal', theme: 'delete' }
      );
      return modal;
    },
  },

  notify: {
    success: (title, message) => {
      const modal = VueDlgThinClient(
        DialogNotify,
        {
          title: title,
          message: message,
          theme: 'success',
          onClose(event) {
            // TODO: можно добавить проверку что модальное окно уже закрытл
            console.log(event);
            modal.close();
          }
        },
        { group: 'notify' }
      );
      return modal;
    },
    warning: (title, message) => {
      const modal = VueDlgThinClient(
        DialogNotify,
        {
          title: title,
          message: message,
          theme: 'warning',
          onClose(event) {
            console.log(event);
            modal.close();
          }
        },
        { group: 'notify' }
      );
      return modal;
    },
    error: (title, message) => {
      const modal = VueDlgThinClient(
        DialogNotify,
        {
          title: title,
          message: message,
          theme: 'error',
          onClose(event) {
            console.log(event);
            modal.close();
          }
        },
        { group: 'notify' }
      );
      return modal;
    },
  },
  
};
