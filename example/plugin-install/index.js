
// Получаем пользовательский список настроек для модального окна
import WindowSettings from './Window/window-config';
// Глобальные стили для текущего конфига
import './style/global-style.scss';

//
import GroupSettings from  './Group/GroupSettings';

//
import VueDlgGroupSettingsClass from 'vue-dlg/src/VueDlgGroupSettingsClass';
import VueDlgStoreClass from 'vue-dlg/src/VueDlgStoreClass';

// переменная для хранения настроек групп
const groupSettingsObj = new VueDlgGroupSettingsClass();

// Добавляем список групп
for (const groupCode in GroupSettings) {
  groupSettingsObj.add(groupCode, GroupSettings[groupCode]);
}

// переменная store
const dlgStoreObj = new VueDlgStoreClass({groupSettings: groupSettingsObj});

// переменная для объединения действий
const actionMerge = {};

for (const windowCode in WindowSettings) {
  actionMerge[windowCode] = WindowSettings[windowCode](dlgStoreObj);
}

// Добавляем список действий
actionMerge.open = dlgStoreObj.add;


// plugin install
import vueDlgPlugin from 'vue-dlg/src/plugin';

// optional
global.DIALOG = actionMerge;

export default {
  install: (app) => {
    vueDlgPlugin.install(app, {
      action: actionMerge,
      store: dlgStoreObj,
    });
  },
};
