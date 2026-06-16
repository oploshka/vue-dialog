
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

import DlgCore from 'vue-dlg/v1/core/DlgCore.vue';
import DlgGroupSettingsDefault from 'vue-dlg/v1/core/DlgGroupSettingsDefault';
import DlgModalClass from 'vue-dlg/v1/core/DlgModalClass';
import DlgStoreClass from 'vue-dlg/v1/core/DlgStoreClass';

export {
  DlgCore,
  DlgGroupSettingsDefault,
  DlgModalClass,
  DlgStoreClass,
};