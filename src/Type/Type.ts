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
  presenterComp?: Component
  presenterProps?: tProps

  wrapComp?: Component
  wrapProps?: tProps

  bridgeComp?: Component
  bridgeProps?: tProps

  closeOnEsc?: boolean
  closeOnBackdrop?: boolean
  onClose?: () => void
}

export interface sLayerDescriptor extends sLayerControlItem {
  zIndex: number
  component: Component
  props: tProps
  settings: sModalSettings
}

export interface sLayerController {
  id: string
  zIndex: number
  items: readonly sLayerItem[]
  handleEsc?: () => boolean
}

// Legacy research type. Wrapper selection is moving into Presenter settings.
export interface sWrapperConfig {
  component: Component
  hasOverlay?: boolean
  overlayColor?: string
  overlayClickToClose?: boolean
}
