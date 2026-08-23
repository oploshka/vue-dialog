import { onBeforeUnmount, onMounted } from 'vue'
import { Focus, type sFocus } from '@/Plugin/Focus'
import type {
  sLayerController,
  sLayerItem,
  sStackLayerController,
} from '@/Type/Type'

export type tFocusFactory = () => sFocus
export interface sFocusBinding {
  bind(item: sLayerItem, element: HTMLElement): void
  unbind(item: sLayerItem): void
}

type tFocusProps = {
  layers: readonly {
    manager: sLayerController
    trapFocus?: boolean
  }[]
}

function isStackController(manager: sLayerController): manager is sStackLayerController {
  const controller = manager as Partial<sStackLayerController>
  return 'top' in controller
    && typeof controller.onItemAdd === 'function'
    && typeof controller.onItemRemove === 'function'
}

export function useFocus(
  props: tFocusProps,
  createFocus: tFocusFactory = () => new Focus(),
): sFocusBinding {
  const controller = props.layers
    .filter(layer => layer.trapFocus === true)
    .map(layer => layer.manager)
    .find(isStackController)

  const focuses = new Map<sLayerItem, sFocus>()
  const stops: Array<() => void> = []
  let initialized = false

  const add = (item: sLayerItem): sFocus => {
    const focus = focuses.get(item) ?? createFocus()
    focuses.set(item, focus)
    return focus
  }
  const remove = (item: sLayerItem): void => {
    focuses.get(item)?.deactivate()
    focuses.delete(item)
  }
  const bind = (item: sLayerItem, element: HTMLElement): void => {
    const focus = add(item)
    focus.bind(element)
    if (initialized && controller?.top === item) focus.activate()
  }
  const unbind = (item: sLayerItem): void => {
    focuses.get(item)?.unbind()
  }

  const init = (): void => {
    if (!controller) return

    controller.items.forEach(item => add(item).activate())
    stops.push(
      controller.onItemAdd(add),
      controller.onItemRemove(remove),
    )
    initialized = true
  }
  const destroy = (): void => {
    stops.forEach(stop => stop())
    focuses.forEach(focus => focus.unbind())
    focuses.clear()
  }

  onMounted(init)
  onBeforeUnmount(destroy)
  return { bind, unbind }
}
