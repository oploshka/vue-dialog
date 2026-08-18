import type { Component } from 'vue'
import type { sLayerDescriptor, sLayerController } from '../../Type/Type'

let counter = 0
function generateId(): string {
  return `modal-${++counter}-${Date.now()}`
}

export class ModalController implements sLayerController {
  id = 'modal-controller'
  zIndex: number
  private _items: sLayerDescriptor[] = []
  private _elementZIndex = 0

  constructor(zIndex: number = 3000) {
    this.zIndex = zIndex
  }

  open(
    component: Component,
    props: Record<string, any> = {},
    type: string = 'modal',
    variant?: string,
    settings: sLayerDescriptor['settings'] = {},
    callbacks: sLayerDescriptor['callbacks'] = {}
  ): string {
    const descriptor: sLayerDescriptor = {
      id: generateId(),
      zIndex: ++this._elementZIndex,
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
    let removed: sLayerDescriptor | undefined

    if (id) {
      const index = this._items.findIndex(item => item.id === id)
      if (index === -1) return
      removed = this._items.splice(index, 1)[0]
    } else {
      removed = this._items.pop()
    }

    removed?.callbacks.onClose?.()

    if (this._items.length === 0) {
      this._elementZIndex = 0
    }
  }

  closeAll(): void {
    while (this._items.length) {
      this.close()
    }
  }

  get items(): readonly sLayerDescriptor[] {
    return this._items
  }

  get top(): sLayerDescriptor | undefined {
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