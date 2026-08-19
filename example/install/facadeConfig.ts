import { modalController, notificationController } from '@example/install/layerConfig'
import { createModalFacade } from '@example/install/Window/Modal/facade'
import { createDialogFacade } from '@example/install/Window/Dialog/facade'
import { createAlertFacade } from '@example/install/Window/Dialog/Alert/facade'
import { createConfirmFacade } from '@example/install/Window/Dialog/Confirm/facade'
import { createPromptFacade } from '@example/install/Window/Dialog/Prompt/facade'
import { createFullscreenFacade } from '@example/install/Window/Fullscreen/facade'
import { createSidebarLeftFacade } from '@example/install/Window/SidebarLeft/facade'
import { createSidebarRightFacade } from '@example/install/Window/SidebarRight/facade'
import { createNotificationFacade } from '@example/install/Window/Notification/facade'

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
