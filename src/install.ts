
// TODO: понять данную необходимость, так как работа будет происходить через экземпляр стора.
// export const install = (app: any, options) => {
//   console.log('Installing plugin')
//   app.config.globalProperties.$dialog      = options.action;
//   app.config.globalProperties.$dialogStore = options.store;
// };
//
// export default {
//   install,
// };

import DlgCore from './core/DlgCore.vue';
import DlgGroupSettingsDefault from './core/DlgGroupSettingsDefault';
import DlgModalClass from './core/DlgModalClass';
import DlgStoreClass from './core/DlgStoreClass';

export {
  DlgCore,
  DlgGroupSettingsDefault,
  DlgModalClass,
  DlgStoreClass,
};