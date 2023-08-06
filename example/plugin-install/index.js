

import './style.scss';

//
import VueDlgGroupSettingsClass from 'vue-dlg/src/VueDlgGroupSettingsClass';
import VueDlgStoreClass from 'vue-dlg/src/VueDlgStoreClass';

const groupSettingsObj = new VueDlgGroupSettingsClass();


import groupSettingsPrepare from './prepareGroupSettings';
groupSettingsPrepare(groupSettingsObj);


const dlgStoreObj = new VueDlgStoreClass({groupSettings: groupSettingsObj});

import InitAction from './initAction';

const action = { ...InitAction(dlgStoreObj), open: dlgStoreObj.add }; 
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