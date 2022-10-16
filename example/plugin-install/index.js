
import vueDlgPlugin from 'vue-dlg/src/plugin';

import dialogAction from './action';
import './group-settings';

// optional
global.DIALOG = dialogAction;

import './style.scss';

export default {
  install: (app) => {
    vueDlgPlugin.install(app, {action: dialogAction});
  },
};