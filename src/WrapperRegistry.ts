import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
import type { sWrapperConfig } from './Type/Type'

export type tWrapperType =
  | 'modal'
  | 'dialog'
  | 'sidebar-left'
  | 'sidebar-right'
  | 'fullscreen'
  | 'notification'

interface sWrapperEntry {
  loader: () => Promise<Component>
  hasOverlay?: boolean
  overlayColor?: string
  overlayClickToClose?: boolean
}

const registry: Record<tWrapperType, sWrapperEntry> = {
  'modal': {
    loader: () => import('./Wrapper/ModalWrapper.vue'),
    hasOverlay: true,
    overlayClickToClose: true,
  },
  'dialog': {
    loader: () => import('./Wrapper/DialogWrapper.vue'),
    hasOverlay: true,
    overlayClickToClose: false,
  },
  'sidebar-left': {
    loader: () => import('./Wrapper/SidebarLeftWrapper.vue'),
    hasOverlay: true,
    overlayClickToClose: true,
  },
  'sidebar-right': {
    loader: () => import('./Wrapper/SidebarRightWrapper.vue'),
    hasOverlay: true,
    overlayClickToClose: true,
  },
  'fullscreen': {
    loader: () => import('./Wrapper/FullscreenWrapper.vue'),
    hasOverlay: false,
  },
  'notification': {
    loader: () => import('./Wrapper/NotificationItem.vue'),
    hasOverlay: false,
  },
}

export function resolveWrapper(type: string): sWrapperConfig | undefined {
  const entry = registry[type as tWrapperType]
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