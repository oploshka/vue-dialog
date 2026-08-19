import type { Modal } from 'vue-dlg/Layer/Modal/Modal'

const componentRefs = new WeakMap<Modal, unknown>()

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
