
import DialogThinClient from 'vue-dlg/src/DialogThinClient';

import DialogBox              from './Template/DialogBox';
import DialogNotify           from './Template/DialogNotify';
import DialogBoxPromptDelete  from './Template/DialogBoxPromptDelete';

export default {
  open: DialogThinClient, // function (VueComponent, VueComponentProps, groupName, setting)
  
  alert: {
    success: (message) => {
      return DialogThinClient(
        DialogBox,
        { title: 'Успешно', message: message, okLabel: 'Ok', theme: 'success' },
        { group: 'modal' }
      );
    },
    warning: (message) => {
      return DialogThinClient(
        DialogBox,
        { title: 'Предупреждение', message: message, okLabel: 'Ok', theme: 'warning' },
        { group: 'modal' }
      );
    },
    error: (message) => {
      return DialogThinClient(
        DialogBox,
        { title: 'Ошибка', message: message, okLabel: 'Ok', theme: 'error' },
        { group: 'modal' }
      );
    },
  },

  prompt: {
    confirm: (title, message, options = {}) => {
      return DialogThinClient(
        DialogBoxPromptDelete,
        {
          title: title,
          message: message,
          okLabel: options && options.okLabel ? options.okLabel : 'Ok',
          cancelLabel:
            options && options.cancelLabel ? options.cancelLabel : 'Отмена',
        },
        { group: 'modal' }
      );
    },

    delete: (title, message, options = {}) => {
      return DialogThinClient(
        DialogBoxPromptDelete,
        {
          title: title,
          message: message || '',
          okLabel: options?.okLabel || 'Delete',
          cancelLabel: options?.cancelLabel || 'Discard',
        },
        { group: 'modal', theme: 'delete' }
      );
    },
  },

  notify: {
    success: (title, message) => {
      return DialogThinClient(
        DialogNotify,
        { title: title, message: message, theme: 'success' },
        { group: 'notify' }
      );
    },
    warning: (title, message) => {
      return DialogThinClient(
        DialogNotify,
        { title: title, message: message, theme: 'warning' },
        { group: 'notify' }
      );
    },
    error: (title, message) => {
      return DialogThinClient(
        DialogNotify,
        { title: title, message: message, theme: 'error' },
        { group: 'notify' }
      );
    },
  },
  
};
