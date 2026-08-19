import { modalLayer } from './layerConfig'
import { createModalFacade } from './Window/Modal/facade'
import { createDialogFacade } from './Window/Dialog/facade'
import { createFullscreenFacade } from './Window/Fullscreen/facade'
import { createSidebarLeftFacade } from './Window/SidebarLeft/facade'
import { createSidebarRightFacade } from './Window/SidebarRight/facade'

export const facadeConfig = {
  Modal: createModalFacade(modalLayer.manager),
  Dialog: createDialogFacade(modalLayer.manager),
  Fullscreen: createFullscreenFacade(modalLayer.manager),
  SidebarLeft: createSidebarLeftFacade(modalLayer.manager),
  SidebarRight: createSidebarRightFacade(modalLayer.manager),
}
