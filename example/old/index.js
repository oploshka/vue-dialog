
// Получаем пользовательский список настроек для модального окна
import WindowSettings from './Window/window-config.js';
// Глобальные стили для текущего конфига
import './style/global-style.scss';

//
import GroupSettings from  './Group/GroupSettings.js';

//
import {DlgGroupSettingsClass, DlgStoreClass} from 'vue-dlg/install.ts';

// переменная для хранения настроек групп
const groupSettingsObj = new DlgGroupSettingsClass();

// Добавляем список групп
for (const groupCode in GroupSettings) {
  groupSettingsObj.add(groupCode, GroupSettings[groupCode]);
}

// переменная store
const dlgStoreObj = new DlgStoreClass({groupSettings: groupSettingsObj});

// переменная для объединения действий
const actionMerge = {};

for (const windowCode in WindowSettings) {
  actionMerge[windowCode] = WindowSettings[windowCode](dlgStoreObj);
}

// Добавляем список действий
actionMerge.open = dlgStoreObj.add;


// plugin install
import vueDlgPlugin from 'vue-dlg/install.ts';

// optional
// @ts-ignore
window.DIALOG = actionMerge;

export default {
  install: (app) => {
    vueDlgPlugin.install(app, {
      action: actionMerge,
      store: dlgStoreObj,
    });
  },
};
