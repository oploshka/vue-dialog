
//
import VueDlgWrapperModal from '../../Template/Wrapper/VueDlgWrapperModal';

export default (groupSettingsObj) => {
  // group modal
  groupSettingsObj.add('sidebar-right', {
    maxDisplayItem: 1,
    overlay: true,
    overlayClickClose : true,
    overlayClosePriority : 100,
    wrapper: VueDlgWrapperModal,
  });
};
