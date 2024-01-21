
import DLG_GROUP from './GroupEnum';

//
import VueDlgWrapperAction from './Wrapper/VueDlgWrapperAction';
import VueDlgWrapperNotify from './Wrapper/VueDlgWrapperNotify';

//
export default {
  [DLG_GROUP.ACTION]: {
    maxDisplayItem: 10,
    overlay: true,
    overlayClickClose : true,
    overlayClosePriority : 10,
    wrapper: VueDlgWrapperAction,
  },
  [DLG_GROUP.NOTIFY]: {
    maxDisplayItem: 3,
    overlay: false,
    overlayClickClose : false,
    overlayClosePriority : 10,
    wrapper: VueDlgWrapperNotify,
  }
};


// // group
// export const addGroup = (groupSettingsObj) => {
//   // group modal
//   groupSettingsObj.add('modal', {
//     maxDisplayItem: 10,
//     overlay: true,
//     overlayClickClose : true,
//     overlayClosePriority : 10,
//     wrapper: VueDlgWrapperModal,
//   });
// };


// //
// // import VueDlgWrapperNotify from './VueDlgWrapperNotify';
// import VueDlgWrapperModal from "vue-dlg/example/plugin-install/Window/Action/_base/VueDlgWrapperModal";
//
// export default (groupSettingsObj) => {
//   // group modal
//   groupSettingsObj.add('notify', {
//     maxDisplayItem: 3,
//     overlay: false,
//     overlayClickClose : false,
//     overlayClosePriority : 999,
//     // wrapper: VueDlgWrapperNotify,
//   });
// };


//
// // style
// import './styleNotify.scss';
// import VueDlgWrapperNotify from './VueDlgWrapperNotify';
// // group
// export const addGroup = (groupSettingsObj) => {
//   // group modal
//   groupSettingsObj.add('notify', {
//     maxDisplayItem: 3,
//     overlay: false,
//     overlayClickClose : false,
//     overlayClosePriority : 999,
//     wrapper: VueDlgWrapperNotify,
//   });
// };
