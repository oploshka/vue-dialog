
// //
// import * as WindowNotify           from './Action/Notify';
// import * as WindowAction           from './Action';
// //
// // import * as WindowCamera           from './Camera';
// // import * as WindowComment          from './Comment';
// // import * as WindowFullscreen       from './Fullscreen';
// // // import * as WindowModal            from './Modal';
// // import * as ModalWindowV1          from './ModalWindowV1';
// // import * as WindowSidebarLeft      from './SidebarLeft';
// // import * as WindowSidebarRight     from './SidebarRight';
// // import * as WindowSidebarRightInfo from './SidebarRightInfo';
//
// const windowList = [
//   // base
//   WindowNotify,
//   WindowAction,
//   // // custom
//   // WindowCamera,
//   // WindowComment,
//   // WindowFullscreen,
//   // // WindowModal,
//   // ModalWindowV1,
//   // WindowSidebarLeft,
//   // WindowSidebarRight,
//   // WindowSidebarRightInfo,
// ];



//
import ActionAlert   from './Action/Alert';
import ActionConfirm from './Action/Confirm';
import ActionPrompt  from './Action/Prompt';
import ActionNotify  from './Action/Notify';


const actionObj = {
  //
  alert:    ActionAlert,
  confirm:  ActionConfirm,
  prompt:   ActionPrompt,
  //
  notify:   ActionNotify,
  //
};

export default actionObj;

/*

// old version

import * as WindowModal from './Window/Modal';
import * as WindowNotify from './Window/Notify';
import * as WindowSidebarRight from './Window/SidebarRight';

const windowList = [
  WindowModal,
  WindowNotify,
  WindowSidebarRight,
];

 */