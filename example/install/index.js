
import dialogAction from "./action";
import vueDlgPlugin from "@vue-dlg/plugin";

import {addGroupSetting} from "@vue-dlg/DialogGroupSettings";

addGroupSetting('modal', {
  maxDisplayItem: 1,
  overlay      : true,
});

addGroupSetting('notify', {
  maxDisplayItem: 3,
  overlay      : false,
});

// optional
// global.DIALOG = dialogAction;

import './style.scss';

export default {
  install: (app) => {
    vueDlgPlugin.install(app, {action: dialogAction})
  },
};