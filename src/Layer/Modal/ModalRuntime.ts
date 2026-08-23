import { EventEmitter, type tEventListener } from '@/Layer/EventEmitter'
import type { Modal, tModalEvents } from '@/Layer/Modal/Modal'

const componentRefs = new WeakMap<Modal, unknown>()
const elements = new WeakMap<Modal, HTMLElement>()
const events = new WeakMap<Modal, EventEmitter<tModalEvents>>()

function getEvents(modal: Modal): EventEmitter<tModalEvents> {
  const emitter = events.get(modal) ?? new EventEmitter<tModalEvents>()
  events.set(modal, emitter)
  return emitter
}

export function onModalEvent<K extends keyof tModalEvents>(
  modal: Modal,
  event: K,
  listener: tEventListener<tModalEvents[K]>,
): () => void {
  return getEvents(modal).on(event, listener)
}

export function attachModalElement(modal: Modal, element: HTMLElement): void {
  if (elements.get(modal) === element) return

  elements.set(modal, element)
  getEvents(modal).emit('attach', element)
}

export function detachModalElement(modal: Modal): void {
  if (!elements.has(modal)) return

  elements.delete(modal)
  getEvents(modal).emit('detach')
}

export function getModalElement(modal: Modal): HTMLElement | null {
  return elements.get(modal) ?? null
}

export function setModalComponentRef(modal: Modal, componentRef: unknown): void {
  if (componentRef == null) {
    componentRefs.delete(modal)
    return
  }

  componentRefs.set(modal, componentRef)
}

export function getModalComponentRef<T = unknown>(modal: Modal): T | null {
  return (componentRefs.get(modal) as T | undefined) ?? null
}
