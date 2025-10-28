import { createApp } from 'vue';
import router from '@app/router';
import App from '@app/App.vue';

import '@app/resource/style/style.scss'


// Это работает только для разработчиков плагина, для использования в своем проекте необходимо копировать эту папку из репозитория
// import VueDlgInstall from '@vue-dlg-example/plugin-install/index.js';
import VueDlgInstall from '@example/plugin-install/index';

//
const VueApp = createApp(App);

VueApp.use(router);
VueApp.use(VueDlgInstall);
//
VueApp.mount('#app');
