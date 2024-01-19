//
import {DLG_GROUP_NOTIFY} from '../../../Group/GroupEnum';
//
import TemplateDialogNotify from './TemplateDialogNotify';

export default (dlgStoreObj) => ({

  success: (message) => {
    const modalObj = dlgStoreObj.add(
      TemplateDialogNotify,
      { title: 'Успешно', message: message, theme: 'success', onClose: () => { modalObj.close(); }, },
      { group: DLG_GROUP_NOTIFY }
    );
    return modalObj;
  },
  warning: (message) => {
    const modalObj = dlgStoreObj.add(
      TemplateDialogNotify,
      { title: 'Предупреждение', message: message, theme: 'warning', onClose: () => { modalObj.close(); }, },
      { group: DLG_GROUP_NOTIFY }
    );
    return modalObj;
  },
  info: (message) => {
    const modalObj = dlgStoreObj.add(
      TemplateDialogNotify,
      { title: 'Информация', message: message, theme: 'info', onClose: () => { modalObj.close(); }, },
      { group: DLG_GROUP_NOTIFY }
    );
    return modalObj;
  },
  error: (message) => {
    const modalObj = dlgStoreObj.add(
      TemplateDialogNotify,
      { title: 'Ошибка', message: message, theme: 'error', onClose: () => { modalObj.close(); }, },
      { group: DLG_GROUP_NOTIFY }
    );
    return modalObj;
  },
});
