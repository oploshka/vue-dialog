
import DialogThinClient from '../../src/DialogThinClient';
import DialogBox        from "../../src/Template/DialogBox";
import DialogNotify     from "../../src/Template/DialogNotify";


export default {
  open: DialogThinClient, // function (VueComponent, VueComponentProps, groupName, setting)
  
  alert: {
    success: (message) => {
      return DialogThinClient(
        DialogBox,
        { title: "Успешно", message: message, okLabel: 'Ok', theme: "success", },
        'modal',
        { }
      );
    },
    warning: (message) => {
      return DialogThinClient(
        DialogBox,
        { title: "Предупреждение", message: message, okLabel: 'Ok', theme: "warning" },
        'modal',
        {  }
      );
    },
    error: (message) => {
      return DialogThinClient(
        DialogBox,
        { title: "Ошибка", message: message, okLabel: 'Ok', theme: "error" },
        'modal',
        { }
      );
    },
  },
  
  confirm(message, options = {}){
    return DialogThinClient(
      DialogBox,
      {
        title: "Подтвердите действие",
        message: message,
        okLabel: (options && options.okLabel) ? options.okLabel : 'Ok',
        cancelLabel: (options && options.cancelLabel) ? options.cancelLabel : 'Отмена',
      },
      'modal',
      {}
    );
  },
  
  notify: (title, message) => {
    return DialogThinClient(
      DialogNotify,
      { title: title, message: message },
      'notify',
      {}
    );
  }
};