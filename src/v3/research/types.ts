import type { Component } from 'vue'

export interface LayerItem {
  id: string
}

export interface LayerDescriptor extends LayerItem {
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

export interface LayerManager {
  id: string
  zIndex: number
  items: readonly LayerItem[]
  handleEsc?: () => boolean
}

export interface WrapperConfig {
  component: Component
  hasOverlay?: boolean
  overlayColor?: string
  overlayClickToClose?: boolean
}