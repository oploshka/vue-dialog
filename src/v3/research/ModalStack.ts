import type { Component } from 'vue'
import type { LayerDescriptor, LayerManager } from './types'

let counter = 0
function generateId(): string {
  return `modal-${++counter}-${Date.now()}`
}

export class ModalStack implements LayerManager {
  id = 'modal-stack'
  zIndex: number
  private _items: LayerDescriptor[] = []

  constructor(zIndex: number = 3000) {
    this.zIndex = zIndex
  }

  open(
    component: Component,
    props: Record<string, any> = {},
    type: string = 'modal',
    variant?: string,
    settings: LayerDescriptor['settings'] = {},
    callbacks: LayerDescriptor['callbacks'] = {}
  ): string {
    const descriptor: LayerDescriptor = {
      id: generateId(),
      type,
      variant,
      component,
      props,
      settings,
      callbacks,
    }

    if (settings.singleton) {
      const existingIndex = this._items.findIndex(item => item.type === type)
      if (existingIndex !== -1) {
        this._items.splice(existingIndex, 1)
      }
    }

    this._items.push(descriptor)
    return descriptor.id
  }

  close(id?: string): void {
    let removed: LayerDescriptor | undefined

    if (id) {
      const index = this._items.findIndex(item => item.id === id)
      if (index === -1) return
      removed = this._items.splice(index, 1)[0]
    } else {
      removed = this._items.pop()
    }

    removed?.callbacks.onClose?.()
  }

  closeAll(): void {
    while (this._items.length) {
      this.close()
    }
  }

  get items(): readonly LayerDescriptor[] {
    return this._items
  }

  get top(): LayerDescriptor | undefined {
    return this._items[this._items.length - 1]
  }

  handleEsc(): boolean {
    const top = this.top
    if (top && top.settings.closeOnEsc !== false) {
      this.close()
      return true
    }
    return false
  }
}