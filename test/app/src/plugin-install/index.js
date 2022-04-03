
import vueDlgPlugin from 'vue-dlg/src/plugin';

import dialogAction from './action';
import './group-settings';

// optional
// global.DIALOG = dialogAction;

// import './style.scss';
import './style-build.css';

export default {
  install: (app) => {
    vueDlgPlugin.install(app, {action: dialogAction});
  },
};