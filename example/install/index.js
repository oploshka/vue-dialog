
import dialogAction from "./action";
import vueDlgPlugin from "../../src/plugin";

import {addGroupSetting} from "../../src/DialogGroupSettings";

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
    vueDlgPlugin.install(app, {action: dialogAction});
  },
};