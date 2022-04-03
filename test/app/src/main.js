import { createApp } from 'vue';
import App from './App.vue';

//
let VueApp = createApp(App)

//
import VueDlg_pluginInstall from './plugin-install/index';
VueApp.use(VueDlg_pluginInstall);

//
VueApp.mount('#app');
