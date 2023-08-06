

import './style.scss';

import * as WindowModal from './Window/Modal';
import * as WindowNotify from './Window/Notify';
import * as WindowSidebarRight from './Window/SidebarRight';

const windowList = [
  WindowModal,
  WindowNotify,
  WindowSidebarRight,
];



//
import VueDlgGroupSettingsClass from 'vue-dlg/src/VueDlgGroupSettingsClass';
import VueDlgStoreClass from 'vue-dlg/src/VueDlgStoreClass';

// переменная для хранения настроек групп
const groupSettingsObj = new VueDlgGroupSettingsClass();

// Добавляем список групп
for (let i = 0; i < windowList.length; i++) {
  const modalSetting = windowList[i];
  if(modalSetting.addGroup) {
    modalSetting.addGroup(groupSettingsObj);
  }
}

// переменная store
const dlgStoreObj = new VueDlgStoreClass({groupSettings: groupSettingsObj});

// переменная для объединения действий 
const actionMerge = {};

// Добавляем список действий
for (let i = 0; i < windowList.length; i++) {
  const modalSetting = windowList[i];
  if(modalSetting.addAction) {
    modalSetting.addAction(actionMerge, dlgStoreObj);
  }
}

// финальная переменная действий
const action = { ...actionMerge, open: dlgStoreObj.add };

// optional
global.DIALOG = action;


import vueDlgPlugin from 'vue-dlg/src/plugin';

export default {
  install: (app) => {
    vueDlgPlugin.install(app, {
      action: action,
      store: dlgStoreObj,
    });
  },
};