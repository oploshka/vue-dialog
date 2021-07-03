import Vue from 'vue';
import App from './Test/App.vue';

// plugin init!!!
import Dlg from './../lib/vue-dialog.umd.min';

Vue.use(Dlg);


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
