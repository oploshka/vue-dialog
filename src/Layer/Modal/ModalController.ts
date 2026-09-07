import { shallowRef, type Component } from 'vue'
import { EventEmitter } from '@/Layer/EventEmitter'
import type {
  sModalSettings,
  sStackLayerController,
  tLayerCollectionListener,
  tProps,
} from '@/Type/Type'
import { Modal } from '@/Layer/Modal/Modal'
import { resolveModalSettings } from '@/Layer/Modal/ModalSettings'

let counter = 0
let controllerCounter = 0
function generateId(): string {
  return `modal-${++counter}-${Date.now()}`
}

type tModalControllerEvents = {
  add: [modal: Modal]
  remove: [modal: Modal]
}

export class ModalController implements sStackLayerController<Modal> {
  id = `modal-controller-${++controllerCounter}`
  zIndex: number
  private _items = shallowRef<Modal[]>([])
  private _elementZIndex = 0
  private readonly events = new EventEmitter<tModalControllerEvents>()

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
      settings: resolveModalSettings(settings),
    }, item => this.removeModal(item))

    this._items.value = [...this._items.value, modal]
    this.events.emit('add', modal)

    return modal
  }

  private removeModal(modal: Modal): void {
    const index = this._items.value.indexOf(modal)
    if (index === -1) return

    this._items.value = [
      ...this._items.value.slice(0, index),
      ...this._items.value.slice(index + 1),
    ]

    this.events.emit('remove', modal)
    modal.settings.onClose?.()

    if (this._items.value.length === 0) {
      this._elementZIndex = 0
    }
  }

  on(
    event: 'add' | 'remove',
    listener: tLayerCollectionListener<Modal>,
  ): () => void {
    return this.events.on(event, listener)
  }

  closeAll(): void {
    let top = this.top
    while (top) {
      top.close()
      top = this.top
    }
  }

  get items(): readonly Modal[] {
    return this._items.value
  }

  get top(): Modal | undefined {
    return this._items.value[this._items.value.length - 1]
  }

  handleEsc(): boolean {
    const top = this.top
    if (top && top.settings.closeOnEsc) {
      top.close()
      return true
    }
    return false
  }
}
