/**
 * @vitest-environment happy-dom
 */

import { defineComponent, h, type Component } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ModalController } from '@/Layer/Modal/ModalController'
import {
  attachModalElement,
  detachModalElement,
} from '@/Layer/Modal/ModalRuntime'
import { useFocus, type tFocusFactory } from '@/Plugin/useFocus'
import type { sFocus } from '@/Plugin/Focus'

const ComponentStub = {} as Component

function createFocusHarness() {
  const activationOrder: HTMLElement[] = []
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
      activate: vi.fn(() => {
        if (element) activationOrder.push(element)
      }),
      deactivate: vi.fn(),
    }

    list.push(focus)
    return focus
  })

  const byElement = (element: HTMLElement) => list.find(focus => focus.element === element)

  return {
    activationOrder,
    factory: factory as tFocusFactory,
    factoryMock: factory,
    byElement,
  }
}

function mountFocus(
  controller: ModalController,
  factory: tFocusFactory,
) {
  return mount(defineComponent({
    setup() {
      useFocus({
        layers: [{ manager: controller, trapFocus: true }],
      }, factory)
      return () => h('div')
    },
  }))
}

describe('useFocus', () => {
  it('activates already attached modals in collection order on mount', () => {
    const { activationOrder, factory, factoryMock } = createFocusHarness()
    const controller = new ModalController()
    const first = controller.open(ComponentStub)
    const second = controller.open(ComponentStub)
    const firstElement = document.createElement('div')
    const secondElement = document.createElement('div')

    attachModalElement(first, firstElement)
    attachModalElement(second, secondElement)

    const wrapper = mountFocus(controller, factory)

    expect(factoryMock).toHaveBeenCalledTimes(2)
    expect(activationOrder).toEqual([firstElement, secondElement])
    wrapper.unmount()
  })

  it('binds and activates a modal when its element attaches', () => {
    const { factory, byElement } = createFocusHarness()
    const controller = new ModalController()
    const wrapper = mountFocus(controller, factory)
    const modal = controller.open(ComponentStub)
    const element = document.createElement('div')

    attachModalElement(modal, element)

    expect(byElement(element)?.bind).toHaveBeenCalledWith(element)
    expect(byElement(element)?.activate).toHaveBeenCalledTimes(1)

    detachModalElement(modal)
    expect(byElement(element)).toBeUndefined()
    wrapper.unmount()
  })

  it('deactivates a removed modal without restoring the previous trap itself', () => {
    const { factory, byElement } = createFocusHarness()
    const controller = new ModalController()
    const wrapper = mountFocus(controller, factory)
    const first = controller.open(ComponentStub)
    const second = controller.open(ComponentStub)
    const firstElement = document.createElement('div')
    const secondElement = document.createElement('div')

    attachModalElement(first, firstElement)
    attachModalElement(second, secondElement)
    const firstFocus = byElement(firstElement)
    const secondFocus = byElement(secondElement)

    second.close()

    expect(secondFocus?.deactivate).toHaveBeenCalledTimes(1)
    expect(firstFocus?.activate).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('stops controller and modal subscriptions on cleanup', () => {
    const { factory, factoryMock, byElement } = createFocusHarness()
    const controller = new ModalController()
    const wrapper = mountFocus(controller, factory)
    const modal = controller.open(ComponentStub)
    const element = document.createElement('div')

    attachModalElement(modal, element)
    const modalFocus = byElement(element)
    modal.close()

    attachModalElement(modal, document.createElement('div'))
    expect(modalFocus?.bind).toHaveBeenCalledTimes(1)

    wrapper.unmount()
    controller.open(ComponentStub)
    expect(factoryMock).toHaveBeenCalledTimes(1)
  })
})
