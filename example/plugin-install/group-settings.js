import { addGroupSetting } from 'vue-dlg/src/VueDlgGroupSettings';

addGroupSetting('modal', {
  maxDisplayItem: 1,
  overlay: true,
  overlayClickClose : true,
  overlayClosePriority : 10,
});

addGroupSetting('sidebar-right', {
  maxDisplayItem: 1,
  overlay: true,
  overlayClickClose : true,
  overlayClosePriority : 100,
});

addGroupSetting('confirm', {
  maxDisplayItem: 1,
  overlay: true,
  overlayClickClose : true,
  overlayClosePriority : 50,
});

addGroupSetting('notify', {
  maxDisplayItem: 3,
  overlay: false,
  overlayClickClose : false,
  overlayClosePriority : 999,
});

export default {};
