import {addGroupSetting} from 'vue-dlg/src/DialogGroupSettings';

addGroupSetting('modal', {
  maxDisplayItem: 1,
  overlay      : true,
});

addGroupSetting('notify', {
  maxDisplayItem: 3,
  overlay      : false,
});


addGroupSetting('sidebar-right', {
  maxDisplayItem: 1,
  overlay: false,
});
addGroupSetting('push', {
  maxDisplayItem: 3,
  overlay: false,
});

export default {};
