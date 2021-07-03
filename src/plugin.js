
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
    }

  };

  Vue.dialog = Vue.prototype.dialog;
};

export default DialogCore;

