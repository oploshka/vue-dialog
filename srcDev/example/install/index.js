
import vueDlgPlugin from "../../src/plugin";

import dialogAction from "./action";
import "./group-settings";
import './style.scss';

// optional
// global.DIALOG = dialogAction;

import './style.scss';

export default {
  install: (app) => {
    vueDlgPlugin.install(app, {action: dialogAction});
  },
};