import { modalController } from './layerConfig'
import { createModalFacade } from './Window/Modal/facade'
import { createDialogFacade } from './Window/Dialog/facade'
import { createFullscreenFacade } from './Window/Fullscreen/facade'
import { createSidebarLeftFacade } from './Window/SidebarLeft/facade'
import { createSidebarRightFacade } from './Window/SidebarRight/facade'

export const facadeConfig = {
  Modal: createModalFacade(modalController),
  Dialog: createDialogFacade(modalController),
  Fullscreen: createFullscreenFacade(modalController),
  SidebarLeft: createSidebarLeftFacade(modalController),
  SidebarRight: createSidebarRightFacade(modalController),
}
