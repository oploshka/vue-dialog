export { Modal } from 'vue-dlg/Layer/Modal/Modal'
export { ModalController } from 'vue-dlg/Layer/Modal/ModalController'
export { default as ModalLayout } from 'vue-dlg/Layer/Modal/ModalLayout.vue'

export { Notification, NotificationController } from 'vue-dlg/Layer/Notification/NotificationController'
export type {
  sNotificationSettings,
  sNotificationControllerSettings,
} from 'vue-dlg/Layer/Notification/NotificationController'

export { default as LayerHost } from 'vue-dlg/LayerHost.vue'

export { default as OverlayMixin, overlayProps } from 'vue-dlg/Mixin/OverlayMixin'
export { default as PresenterMixin, presenterProps } from 'vue-dlg/Mixin/PresenterMixin'
export { default as BridgeMixin, bridgeProps } from 'vue-dlg/Mixin/BridgeMixin'
export { default as WrapperMixin, wrapperProps } from 'vue-dlg/Mixin/WrapperMixin'

export { default as OverlayDefault } from 'vue-dlg/Default/OverlayDefault.vue'
export { default as PresenterDefault } from 'vue-dlg/Default/PresenterDefault.vue'
export { default as BridgeDefault } from 'vue-dlg/Default/BridgeDefault.vue'
export { default as WrapperDefault } from 'vue-dlg/Default/WrapperDefault.vue'

export type {
  sLayerControlItem,
  sLayerController,
  sLayerDescriptor,
  sLayerItem,
  sModalSettings,
  sResolvedModalSettings,
  tProps,
} from 'vue-dlg/Type/Type'
