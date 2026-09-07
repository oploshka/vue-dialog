import type { Component } from 'vue'

export type tProps = Record<string, any>

export interface sLayerItem {
  id: string
}

/**
 * Public control surface returned by a layer controller.
 * Concrete controllers may expose additional methods and state.
 */
export interface sLayerControlItem extends sLayerItem {
  close(): this
  getComponentRef<T = unknown>(): T | null
}

export interface sModalSettings {
  presenterComp?: Component | null
  presenterProps?: tProps | null

  overlayComp?: Component | null
  overlayProps?: tProps | null

  wrapComp?: Component | null
  wrapProps?: tProps | null

  bridgeComp?: Component | null
  bridgeProps?: tProps | null

  closeOnEsc?: boolean
  closeOnBackdrop?: boolean
  onClose?: () => void
}

export interface sResolvedModalSettings {
  presenterComp: Component
  presenterProps: tProps

  overlayComp: Component
  overlayProps: tProps

  wrapComp: Component
  wrapProps: tProps

  bridgeComp: Component
  bridgeProps: tProps

  closeOnEsc: boolean
  closeOnBackdrop: boolean
  onClose?: () => void
}

export interface sLayerDescriptor extends sLayerControlItem {
  zIndex: number
  component: Component
  props: tProps
  settings: sResolvedModalSettings
}

export interface sLayerController {
  id: string
  zIndex: number
  items: readonly sLayerItem[]
  handleEsc?: () => boolean
}

/** Static configuration for one controller rendered by LayerHost. */
export interface sLayerEntry {
  manager: sLayerController
  template: Component
  lockBodyScroll?: boolean
  trapFocus?: boolean
}

export type tLayerCollectionListener<T extends sLayerItem = sLayerItem> = (
  item: T,
) => void

/**
 * Layer controller backed by a stack-like collection.
 * Collection events are the runtime source of truth for consumers.
 */
export interface sStackLayerController<T extends sLayerItem = sLayerItem>
  extends sLayerController {
  readonly top: T | undefined
  on(
    event: 'add' | 'remove',
    listener: tLayerCollectionListener<T>,
  ): () => void
}

// Legacy research type. Wrapper selection is moving into Presenter settings.
export interface sWrapperConfig {
  component: Component
  hasOverlay?: boolean
  overlayColor?: string
  overlayClickToClose?: boolean
}
