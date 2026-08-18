import type { Component } from 'vue'
import type { sLayerController, sModalSettings, tProps } from '../../Type/Type'
import { Modal } from './Modal'

let counter = 0
function generateId(): string {
  return `modal-${++counter}-${Date.now()}`
}

export class ModalController implements sLayerController {
  id = 'modal-controller'
  zIndex: number
  private _items: Modal[] = []
  private _elementZIndex = 0

  constructor(zIndex: number = 3000) {
    this.zIndex = zIndex
  }

  open(
    component: Component,
    props: tProps = {},
    settings: sModalSettings = {},
  ): Modal {
    const modal = new Modal({
      id: generateId(),
      zIndex: ++this._elementZIndex,
      component,
      props,
      settings,
    }, item => this.removeModal(item))

    this._items.push(modal)
    return modal
  }

  private removeModal(modal: Modal): void {
    const index = this._items.indexOf(modal)
    if (index === -1) return

    this._items.splice(index, 1)
    modal.settings.onClose?.()

    if (this._items.length === 0) {
      this._elementZIndex = 0
    }
  }

  closeAll(): void {
    let top = this.top
    while (top) {
      top.close()
      top = this.top
    }
  }

  get items(): readonly Modal[] {
    return this._items
  }

  get top(): Modal | undefined {
    return this._items[this._items.length - 1]
  }

  handleEsc(): boolean {
    const top = this.top
    if (top && top.settings.closeOnEsc !== false) {
      top.close()
      return true
    }
    return false
  }
}
