import { modalController, notificationController } from './layerConfig'
import { createModalFacade } from './Window/Modal/facade'
import { createDialogFacade } from './Window/Dialog/facade'
import { createAlertFacade } from './Window/Dialog/Alert/facade'
import { createConfirmFacade } from './Window/Dialog/Confirm/facade'
import { createPromptFacade } from './Window/Dialog/Prompt/facade'
import { createFullscreenFacade } from './Window/Fullscreen/facade'
import { createSidebarLeftFacade } from './Window/SidebarLeft/facade'
import { createSidebarRightFacade } from './Window/SidebarRight/facade'
import { createNotificationFacade } from './Window/Notification/facade'

export const facadeConfig = {
  Modal: createModalFacade(modalController),
  Dialog: createDialogFacade(modalController),
  Alert: createAlertFacade(modalController),
  Confirm: createConfirmFacade(modalController),
  Prompt: createPromptFacade(modalController),
  Fullscreen: createFullscreenFacade(modalController),
  SidebarLeft: createSidebarLeftFacade(modalController),
  SidebarRight: createSidebarRightFacade(modalController),
  Notification: createNotificationFacade(notificationController),
}

// @ts-ignore
window.DIALOG = facadeConfig;
