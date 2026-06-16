import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
import type { WrapperConfig } from './types'

export type WrapperType =
  | 'modal'
  | 'dialog'
  | 'sidebar-left'
  | 'sidebar-right'
  | 'fullscreen'
  | 'notification'

interface WrapperEntry {
  loader: () => Promise<Component>
  hasOverlay?: boolean
  overlayColor?: string
  overlayClickToClose?: boolean
}

const registry: Record<WrapperType, WrapperEntry> = {
  'modal': {
    loader: () => import('./wrappers/ModalWrapper.vue'),
    hasOverlay: true,
    overlayClickToClose: true,
  },
  'dialog': {
    loader: () => import('./wrappers/DialogWrapper.vue'),
    hasOverlay: true,
    overlayClickToClose: false,
  },
  'sidebar-left': {
    loader: () => import('./wrappers/SidebarLeftWrapper.vue'),
    hasOverlay: true,
    overlayClickToClose: true,
  },
  'sidebar-right': {
    loader: () => import('./wrappers/SidebarRightWrapper.vue'),
    hasOverlay: true,
    overlayClickToClose: true,
  },
  'fullscreen': {
    loader: () => import('./wrappers/FullscreenWrapper.vue'),
    hasOverlay: false,
  },
  'notification': {
    loader: () => import('./NotificationItem.vue'),
    hasOverlay: false,
  },
}

export function resolveWrapper(type: string): WrapperConfig | undefined {
  const entry = registry[type as WrapperType]
  if (!entry) {
    console.warn(`[Overlay] Неизвестный тип слоя: "${type}"`)
    return undefined
  }

  return {
    component: defineAsyncComponent(entry.loader),
    hasOverlay: entry.hasOverlay,
    overlayColor: entry.overlayColor,
    overlayClickToClose: entry.overlayClickToClose,
  }
}