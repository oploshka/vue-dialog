//
import DLG_GROUP from '../../../Group/GroupEnum.js';
//
import DlgWindowActionNotify from './DlgWindowActionNotify.vue';

export default (dlgStoreObj) => ({

  success: (message) => {
    const modalObj = dlgStoreObj.add(
      DlgWindowActionNotify,
      { title: 'Успешно', message: message, theme: 'success', onClose: () => { modalObj.close(); }, },
      { group: DLG_GROUP.NOTIFY }
    );
    return modalObj;
  },
  warning: (message) => {
    const modalObj = dlgStoreObj.add(
      DlgWindowActionNotify,
      { title: 'Предупреждение', message: message, theme: 'warning', onClose: () => { modalObj.close(); }, },
      { group: DLG_GROUP.NOTIFY }
    );
    return modalObj;
  },
  info: (message) => {
    const modalObj = dlgStoreObj.add(
      DlgWindowActionNotify,
      { title: 'Информация', message: message, theme: 'info', onClose: () => { modalObj.close(); }, },
      { group: DLG_GROUP.NOTIFY }
    );
    return modalObj;
  },
  error: (message) => {
    const modalObj = dlgStoreObj.add(
      DlgWindowActionNotify,
      { title: 'Ошибка', message: message, theme: 'error', onClose: () => { modalObj.close(); }, },
      { group: DLG_GROUP.NOTIFY }
    );
    return modalObj;
  },
});
