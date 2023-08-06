
//
import VueDlgWrapperModal from './Template/Wrapper/VueDlgWrapperModal';

export default (groupSettingsObj) => {
  // group modal
  groupSettingsObj.add('modal', {
    maxDisplayItem: 1,
    overlay: true,
    overlayClickClose : true,
    overlayClosePriority : 10,
    wrapper: VueDlgWrapperModal,
  });

  // group sidebar-right
  groupSettingsObj.add('sidebar-right', {
    maxDisplayItem: 1,
    overlay: true,
    overlayClickClose : true,
    overlayClosePriority : 100,
    wrapper: VueDlgWrapperModal,
  });

  // group confirm (без доп стилей)
  groupSettingsObj.add('confirm', {
    maxDisplayItem: 1,
    overlay: true,
    overlayClickClose : true,
    overlayClosePriority : 50,
    wrapper: VueDlgWrapperModal,
  });

  // group notify
  groupSettingsObj.add('notify', {
    maxDisplayItem: 3,
    overlay: false,
    overlayClickClose : false,
    overlayClosePriority : 999,
    wrapper: VueDlgWrapperModal,
  });
};
