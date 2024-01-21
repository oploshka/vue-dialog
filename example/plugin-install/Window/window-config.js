
//
import WindowActionAlert   from './Action/Alert';
import WindowActionConfirm from './Action/Confirm';
import WindowActionPrompt  from './Action/Prompt';
//
import WindowActionNotify  from './Action/Notify';
//
import WindowModal  from './Modal';

// import * as WindowModal            from './Modal'; // add theme fullscreen
// import * as WindowSidebarLeft      from './SidebarLeft';
// import * as WindowSidebarRight     from './SidebarRight';
//
// import * as WindowCamera           from './Camera';
// import * as WindowComment          from './Comment';

//
const actionObj = {
  //
  alert:    WindowActionAlert,
  confirm:  WindowActionConfirm,
  prompt:   WindowActionPrompt,
  //
  notify:   WindowActionNotify,
  //
  Modal: WindowModal, 
};

export default actionObj;
