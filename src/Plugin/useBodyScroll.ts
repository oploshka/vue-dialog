import { onBeforeUnmount, onMounted } from 'vue'
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
  const controllers = props.layers
    .filter(layer => layer.lockBodyScroll === true)
    .map(layer => layer.manager)
    .filter(isStackController)

  const stops: Array<() => void> = []
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
  const remove = (): void => {
    if (controllers.some(controller => controller.items.length > 0)) return
    unlock()
  }

  const init = (): void => {
    if (controllers.some(controller => controller.items.length > 0)) lock()
    controllers.forEach(controller => stops.push(
      controller.on('add', lock),
      controller.on('remove', remove),
    ))
  }
  const destroy = (): void => {
    stops.forEach(stop => stop())
    unlock()
  }

  onMounted(init)
  onBeforeUnmount(destroy)
}
