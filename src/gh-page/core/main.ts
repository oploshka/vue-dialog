import { createApp } from 'vue';
import router from './router';
import App from './layout/App.vue';

import './../resource/style/style.scss'


// Это работает только для разработчиков плагина, для использования в своем проекте необходимо копировать эту папку из репозитория
// import VueDlgInstall from '@vue-dlg-example/plugin-install/index.js';
import VueDlgInstall from './../../../example/plugin-install/index.js';

//
const VueApp = createApp(App);

VueApp.use(router);
VueApp.use(VueDlgInstall);
//
VueApp.mount('#app');
