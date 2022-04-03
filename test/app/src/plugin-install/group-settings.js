import {addGroupSetting} from 'vue-dlg/src/DialogGroupSettings';

addGroupSetting('modal', {
  maxDisplayItem: 1,
  overlay      : true,
});

addGroupSetting('notify', {
  maxDisplayItem: 3,
  overlay      : false,
});

export default {};
