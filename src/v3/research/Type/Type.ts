
import type { Component } from 'vue'

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

export interface sLayerDescriptor extends sLayerControlItem {
  zIndex: number
  type: string
  variant?: string
  component: Component
  props: Record<string, any>
  settings: {
    singleton?: boolean
    closeOnEsc?: boolean
    closeOnBackdrop?: boolean
  }
  callbacks: {
    onClose?: () => void
    onConfirm?: (result: any) => void
  }
}

export interface sLayerController {
  id: string
  zIndex: number
  items: readonly sLayerItem[]
  handleEsc?: () => boolean
}

export interface sWrapperConfig {
  component: Component
  hasOverlay?: boolean
  overlayColor?: string
  overlayClickToClose?: boolean
}