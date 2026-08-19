import { createModalFacade } from './Window/Modal/facade'
import { createDialogFacade } from './Window/Dialog/facade'
import { createFullscreenFacade } from './Window/Fullscreen/facade'
import { createSidebarLeftFacade } from './Window/SidebarLeft/facade'
import { createSidebarRightFacade } from './Window/SidebarRight/facade'

export const facadeConfig = {
  Modal: createModalFacade,
  Dialog: createDialogFacade,
  Fullscreen: createFullscreenFacade,
  SidebarLeft: createSidebarLeftFacade,
  SidebarRight: createSidebarRightFacade,
}
