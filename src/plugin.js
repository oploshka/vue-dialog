
// import { createApp } from 'vue';
// import DialogCore from './DialogCore';
import VueDlgThinClient from './VueDlgThinClient';

const install = (app, options) => {
  //const dlg = new (Vue.extend(DialogCore))({propsData: options});

  /*
  const dlgApp = createApp(DialogCore);
  dlgApp.config.globalProperties = app.config.globalProperties;
  const dlg = dlgApp.mount('#modal');
  */
  const dialog = options.action || { open: VueDlgThinClient };
  
  app.config.globalProperties.$dialog = dialog;
};

export default {
  install: install
};
