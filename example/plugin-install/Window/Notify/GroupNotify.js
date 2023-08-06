
//
import VueDlgWrapperModal from '../../Template/Wrapper/VueDlgWrapperModal';

export default (groupSettingsObj) => {
  // group modal
  groupSettingsObj.add('notify', {
    maxDisplayItem: 3,
    overlay: false,
    overlayClickClose : false,
    overlayClosePriority : 999,
    wrapper: VueDlgWrapperModal,
  });
};
