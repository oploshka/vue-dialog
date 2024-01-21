
import DLG_GROUP from './GroupEnum';

//
import DlgGroupAction from './Wrapper/DlgGroupAction';
import DlgGroupNotify from './Wrapper/DlgGroupNotify';
import DlgGroupModal from './Wrapper/DlgGroupModal';

//
export default {
  [DLG_GROUP.ACTION]: {
    maxDisplayItem: 10,
    overlay: true,
    overlayClickClose : true,
    overlayClosePriority : 10,
    wrapper: DlgGroupAction,
  },
  [DLG_GROUP.NOTIFY]: {
    maxDisplayItem: 3,
    overlay: false,
    overlayClickClose : false,
    overlayClosePriority : 999,
    wrapper: DlgGroupNotify,
  },
  [DLG_GROUP.MODAL]: {
    maxDisplayItem: 1,
    overlay: true,
    overlayClickClose : true,
    overlayClosePriority : 100,
    wrapper: DlgGroupModal,
  }
};
