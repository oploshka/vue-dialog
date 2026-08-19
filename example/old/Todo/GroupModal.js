
//
// import VueDlgWrapperModal from './VueDlgWrapperModal';

export default (groupSettingsObj) => {
  // group modal
  groupSettingsObj.add('modal', {
    maxDisplayItem: 1,
    overlay: true,
    overlayClickClose : true,
    overlayClosePriority : 10,
    // wrapper: VueDlgWrapperModal,
  });
};
