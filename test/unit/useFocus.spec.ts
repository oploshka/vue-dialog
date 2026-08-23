/**
 * @vitest-environment happy-dom
 */

import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { useFocus, type sFocusBinding, type tFocusFactory } from '@/Plugin/useFocus'
import type { sFocus } from '@/Plugin/Focus'
import type {
  sLayerItem,
  sStackLayerController,
  tLayerCollectionListener,
} from '@/Type/Type'

function createController(id: string, zIndex: number) {
  const items: sLayerItem[] = []
  const addListeners = new Set<tLayerCollectionListener>()
  const removeListeners = new Set<tLayerCollectionListener>()

  const controller: sStackLayerController = {
    id,
    zIndex,
    get items() { return items },
    get top() { return items[items.length - 1] },
    onItemAdd(listener) {
      addListeners.add(listener)
      return () => addListeners.delete(listener)
    },
    onItemRemove(listener) {
      removeListeners.add(listener)
      return () => removeListeners.delete(listener)
    },
  }

  const open = (item: sLayerItem) => {
    items.push(item)
    addListeners.forEach(listener => listener(item))
  }

  const close = (item: sLayerItem) => {
    const index = items.indexOf(item)
    if (index === -1) return
    items.splice(index, 1)
    removeListeners.forEach(listener => listener(item))
  }

  return {
    controller,
    open,
    close,
    listenerCount: () => addListeners.size + removeListeners.size,
  }
}

function createFocusHarness() {
  const list: Array<sFocus & {
    bind: ReturnType<typeof vi.fn>
    unbind: ReturnType<typeof vi.fn>
    activate: ReturnType<typeof vi.fn>
    deactivate: ReturnType<typeof vi.fn>
  }> = []

  const factory = vi.fn((): sFocus => {
    let element: HTMLElement | null = null

    const focus = {
      get element() { return element },
      bind: vi.fn((value: HTMLElement) => { element = value }),
      unbind: vi.fn(() => { element = null }),
      activate: vi.fn(),
      deactivate: vi.fn(),
    }

    list.push(focus)
    return focus
  })

  const byElement = (element: HTMLElement) => list.find(focus => focus.element === element)

  return {
    factory: factory as tFocusFactory,
    factoryMock: factory,
    list,
    byElement,
  }
}

function mountFocus(
  controller: sStackLayerController,
  factory: tFocusFactory,
) {
  let focus!: sFocusBinding

  const wrapper = mount(defineComponent({
    setup() {
      focus = useFocus({
        layers: [{ manager: controller, trapFocus: true }],
      }, factory)
      return () => h('div')
    },
  }))

  return { focus, wrapper }
}

describe('useFocus', () => {
  it('activates existing items in collection order and then subscribes', () => {
    const { factory, factoryMock, list } = createFocusHarness()
    const modal = createController('modal', 3000)
    modal.open({ id: 'first' })
    modal.open({ id: 'second' })

    const { wrapper } = mountFocus(modal.controller, factory)

    expect(factoryMock).toHaveBeenCalledTimes(2)
    expect(list[0]?.activate).toHaveBeenCalledTimes(1)
    expect(list[1]?.activate).toHaveBeenCalledTimes(1)
    expect(list[0]?.activate.mock.invocationCallOrder[0])
      .toBeLessThan(list[1]?.activate.mock.invocationCallOrder[0] ?? 0)
    expect(modal.listenerCount()).toBe(2)

    wrapper.unmount()
    expect(modal.listenerCount()).toBe(0)
  })

  it('activates a new top modal when its DOM element is bound', () => {
    const { factory, byElement } = createFocusHarness()
    const modal = createController('modal', 3000)
    const { focus, wrapper } = mountFocus(modal.controller, factory)
    const item = { id: 'modal-1' }
    const element = document.createElement('div')

    modal.open(item)
    focus.bind(item, element)

    expect(byElement(element)?.activate).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('deactivates the closed modal without restoring the previous trap itself', () => {
    const { factory, byElement } = createFocusHarness()
    const modal = createController('modal', 3000)
    const { focus, wrapper } = mountFocus(modal.controller, factory)
    const first = { id: 'first' }
    const second = { id: 'second' }
    const firstElement = document.createElement('div')
    const secondElement = document.createElement('div')

    modal.open(first)
    focus.bind(first, firstElement)
    modal.open(second)
    focus.bind(second, secondElement)

    modal.close(second)

    expect(byElement(secondElement)?.deactivate).toHaveBeenCalledTimes(1)
    expect(byElement(firstElement)?.activate).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('unbinds focus when its DOM element disappears', () => {
    const { factory, byElement } = createFocusHarness()
    const modal = createController('modal', 3000)
    const { focus, wrapper } = mountFocus(modal.controller, factory)
    const item = { id: 'modal' }
    const element = document.createElement('div')

    modal.open(item)
    focus.bind(item, element)
    const modalFocus = byElement(element)

    focus.unbind(item)

    expect(modalFocus?.unbind).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
