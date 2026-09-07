import { onBeforeUnmount, onMounted } from 'vue'
import { ModalController } from '@/Layer/Modal/ModalController'
import type { Modal } from '@/Layer/Modal/Modal'
import { getModalElement } from '@/Layer/Modal/ModalRuntime'
import { Focus, type sFocus } from '@/Plugin/Focus'
import type { sLayerController } from '@/Type/Type'

export type tFocusFactory = () => sFocus

type tFocusProps = {
  layers: readonly {
    manager: sLayerController
    trapFocus?: boolean
  }[]
}

export function useFocus(
  props: tFocusProps,
  createFocus: tFocusFactory = () => new Focus(),
): void {
  const layer = props.layers.find(
    layer => layer.trapFocus === true && layer.manager instanceof ModalController,
  )
  const controller = layer?.manager instanceof ModalController
    ? layer.manager
    : undefined

  const focuses = new Map<Modal, sFocus>()
  const modalStops = new Map<Modal, () => void>()
  const stops: Array<() => void> = []

  const activate = (modal: Modal, focus: sFocus): void => {
    if (controller?.top === modal) focus.activate()
  }

  const add = (modal: Modal): sFocus => {
    const existing = focuses.get(modal)
    if (existing) return existing

    const focus = createFocus()
    const element = getModalElement(modal)
    if (element) focus.bind(element)

    const stopAttach = modal.on('attach', element => {
      focus.bind(element)
      activate(modal, focus)
    })
    const stopDetach = modal.on('detach', () => focus.unbind())

    focuses.set(modal, focus)
    modalStops.set(modal, () => {
      stopAttach()
      stopDetach()
    })

    return focus
  }

  const remove = (modal: Modal): void => {
    modalStops.get(modal)?.()
    modalStops.delete(modal)
    focuses.get(modal)?.deactivate()
    focuses.delete(modal)
  }

  const init = (): void => {
    if (!controller) return

    controller.items.forEach(modal => {
      const focus = add(modal)
      if (focus.element) focus.activate()
    })

    stops.push(
      controller.on('add', add),
      controller.on('remove', remove),
    )
  }

  const destroy = (): void => {
    stops.forEach(stop => stop())
    modalStops.forEach(stop => stop())
    focuses.forEach(focus => focus.unbind())
    modalStops.clear()
    focuses.clear()
  }

  onMounted(init)
  onBeforeUnmount(destroy)
}
