

export const install = (app: any, options) => {
  console.log('Installing plugin')
  app.config.globalProperties.$dialog      = options.action;
  app.config.globalProperties.$dialogStore = options.store;
};

export default {
  install,
};

import DlgCore from './core/DlgCore.vue';
import DlgGroupSettingsClass from './core/DlgGroupSettingsClass.js';
import DlgModalClass from './core/DlgModalClass.js';
import DlgStoreClass from './core/DlgStoreClass.js';

export {
  DlgCore,
  DlgGroupSettingsClass,
  DlgModalClass,
  DlgStoreClass,
};