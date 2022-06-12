import {addGroupSetting} from 'vue-dlg/src/DialogGroupSettings';

addGroupSetting('modal', {
  maxDisplayItem    : 1,
  overlay           : true,
  overlayClickClose : true,
  overlayClosePriority : 100,
});

addGroupSetting('notify', {
  maxDisplayItem: 3,
  overlay      : false,
});


addGroupSetting('sidebar-right', {
  maxDisplayItem: 1,
  overlay: false,
});

export default {};
