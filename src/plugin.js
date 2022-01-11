
import DialogCore from './DialogCore';
import DialogTemplateMessage from "./Template/DialogTemplateMessage";


DialogCore.install = (Vue, options) => {
  const dlg = new (Vue.extend(DialogCore))({propsData: options});

  Vue.prototype.$dialog = {
    open: dlg.open,

    alert: {
      success: (message) => {
        return dlg.open(DialogTemplateMessage, { title: "Успешно", message: message, okLabel: 'Ok' }, {theme: "success", close: {} });
      },
      warning: (message) => {
        return dlg.open(DialogTemplateMessage, { title: "Предупреждение", message: message, okLabel: 'Ok' }, {theme: "warning", close: {} });
      },
      error: (message) => {
        return dlg.open(DialogTemplateMessage, { title: "Ошибка", message: message, okLabel: 'Ok' }, {theme: "error", close: {} });
      },
    },

    confirm(message, options = {}){
      return dlg.open(
        DialogTemplateMessage,
        {
          title: "Подтвердите действие",
          message: message,
          okLabel: (options && options.okLabel) ? options.okLabel : 'Ok',
          cancelLabel: (options && options.cancelLabel) ? options.cancelLabel : 'Отмена',
        },
        {
          theme: "error",
          close: {}
        });
    },
  };

  Vue.dialog = Vue.prototype.dialog;
};

export default DialogCore;

