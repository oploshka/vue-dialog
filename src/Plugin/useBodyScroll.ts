import { onBeforeUnmount, onMounted, watch } from 'vue'
import type {
  sLayerController,
  sStackLayerController,
} from '@/Type/Type'

type tBodyScrollProps = {
  layers: readonly {
    manager: sLayerController
    lockBodyScroll?: boolean
  }[]
  onLockBodyScroll?: () => void
  onUnlockBodyScroll?: () => void
}

function isStackController(manager: sLayerController): manager is sStackLayerController {
  const controller = manager as Partial<sStackLayerController>
  return 'top' in controller && typeof controller.on === 'function'
}

export function useBodyScroll(props: tBodyScrollProps): void {
  let controllers: sStackLayerController[] = []
  let stops: Array<() => void> = []
  let stopWatch: (() => void) | undefined
  let locked = false

  const lock = (): void => {
    if (locked) return
    props.onLockBodyScroll?.()
    locked = true
  }
  const unlock = (): void => {
    if (!locked) return
    props.onUnlockBodyScroll?.()
    locked = false
  }
  const sync = (): void => {
    if (controllers.some(controller => controller.items.length > 0)) lock()
    else unlock()
  }

  const init = (): void => {
    stopWatch = watch(
      () => props.layers
        .filter(layer => layer.lockBodyScroll === true)
        .map(layer => layer.manager)
        .filter(isStackController),
      nextControllers => {
        stops.forEach(stop => stop())
        stops = []
        controllers = [...new Set(nextControllers)]
        controllers.forEach(controller => stops.push(
          controller.on('add', sync),
          controller.on('remove', sync),
        ))
        sync()
      },
      { immediate: true, flush: 'sync' },
    )
  }
  const destroy = (): void => {
    stopWatch?.()
    stops.forEach(stop => stop())
    unlock()
  }

  onMounted(init)
  onBeforeUnmount(destroy)
}
