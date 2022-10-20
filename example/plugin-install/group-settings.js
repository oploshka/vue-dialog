
import { addGroupSetting } from 'vue-dlg/src/VueDlgGroupSettings';
import VueDlgWrapperModal from './Template/Wrapper/VueDlgWrapperModal';
import { shallowRef } from 'vue';

addGroupSetting('modal', {
  maxDisplayItem: 1,
  overlay: true,
  overlayClickClose : true,
  overlayClosePriority : 10,
  wrapper: shallowRef(VueDlgWrapperModal),
});

addGroupSetting('sidebar-right', {
  maxDisplayItem: 1,
  overlay: true,
  overlayClickClose : true,
  overlayClosePriority : 100,
  wrapper: shallowRef(VueDlgWrapperModal),
});

addGroupSetting('confirm', {
  maxDisplayItem: 1,
  overlay: true,
  overlayClickClose : true,
  overlayClosePriority : 50,
  wrapper: shallowRef(VueDlgWrapperModal),
});

addGroupSetting('notify', {
  maxDisplayItem: 3,
  overlay: false,
  overlayClickClose : false,
  overlayClosePriority : 999,
  wrapper: shallowRef(VueDlgWrapperModal),
});

export default {};
