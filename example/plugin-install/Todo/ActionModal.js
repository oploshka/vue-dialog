
//
import ActionModalAlert from './ActionModalAlert';
import ActionModalConfirm from './ActionModalConfirm';
import ActionModalPrompt from './ActionModalPrompt';

export default (action, dlgStoreObj) => {
  action.alert    = ActionModalAlert(dlgStoreObj);
  action.confirm  = ActionModalConfirm(dlgStoreObj);
  action.prompt    = ActionModalPrompt(dlgStoreObj);
};
