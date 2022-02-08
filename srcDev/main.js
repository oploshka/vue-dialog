/*
import Vue from 'vue';
import App from './Test/App.vue';

// plugin init!!!
import Dlg from '../src/plugin';

Vue.use(Dlg);


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
*/

import { createApp } from 'vue';
import App from './Test/App.vue';

// plugin init!!!
import Dlg_PluginInstallProxy from '../example/install';

// 1. Assign app to a variable
let app = createApp(App);

// 3. Use router and mount app
app.use(Dlg_PluginInstallProxy);

global.VueApp = app.mount('#app');