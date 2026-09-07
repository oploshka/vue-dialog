import { onBeforeUnmount, onMounted, watch } from 'vue'
import { ModalController } from '@/Layer/Modal/ModalController'
import type { Modal } from '@/Layer/Modal/Modal'
import { getModalElement } from '@/Layer/Modal/ModalRuntime'
import { Focus, type sFocus } from '@/Module/Focus/Focus'
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
  let controllers: ModalController[] = []
  const focus = createFocus()
  const modalStops = new Map<Modal, () => void>()
  let stops: Array<() => void> = []
  let stopWatch: (() => void) | undefined

  const getTopModal = (): Modal | undefined => {
    for (let index = controllers.length - 1; index >= 0; index--) {
      const modal = controllers[index].top
      if (modal) return modal
    }
  }

  const sync = (): void => {
    const modal = getTopModal()

    if (!modal) {
      focus.deactivate()
      focus.unbind()
      return
    }

    const element = getModalElement(modal)
    if (!element) {
      focus.pause()
      return
    }

    if (focus.element !== element) focus.bind(element)
    focus.activate()
  }

  const add = (modal: Modal): void => {
    if (modalStops.has(modal)) return

    const stopAttach = modal.on('attach', sync)
    const stopDetach = modal.on('detach', sync)

    modalStops.set(modal, () => {
      stopAttach()
      stopDetach()
    })
  }

  const remove = (modal: Modal): void => {
    modalStops.get(modal)?.()
    modalStops.delete(modal)
  }

  const clearSubscriptions = (): void => {
    stops.forEach(stop => stop())
    stops = []
    modalStops.forEach(stop => stop())
    modalStops.clear()
  }

  const subscribe = (): void => {
    controllers.forEach(controller => {
      controller.items.forEach(add)
      stops.push(
        controller.on('add', modal => {
          add(modal)
          sync()
        }),
        controller.on('remove', modal => {
          remove(modal)
          sync()
        }),
      )
    })

    sync()
  }

  const init = (): void => {
    stopWatch = watch(
      () => props.layers
        .filter(layer => layer.trapFocus === true && layer.manager instanceof ModalController)
        .map(layer => ({ manager: layer.manager as ModalController, zIndex: layer.manager.zIndex }))
        .sort((a, b) => a.zIndex - b.zIndex),
      entries => {
        clearSubscriptions()
        controllers = [...new Set(entries.map(entry => entry.manager))]
        subscribe()
      },
      { immediate: true, flush: 'sync' },
    )
  }

  const destroy = (): void => {
    stopWatch?.()
    clearSubscriptions()
    focus.deactivate(false)
    focus.unbind()
  }

  onMounted(init)
  onBeforeUnmount(destroy)
}
