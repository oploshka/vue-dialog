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
import { useFocus, type tFocusFactory } from '@/Module/Focus/useFocus'
import type { sFocus } from '@/Module/Focus/Focus'

const ComponentStub = {} as Component

type tFocusLayer = {
  manager: ModalController
  trapFocus?: boolean
}

function createFocusHarness() {
  let element: HTMLElement | null = null

  const focus = {
    get element() { return element },
    bind: vi.fn((value: HTMLElement) => { element = value }),
    pause: vi.fn(),
    activate: vi.fn(),
    deactivate: vi.fn(),
    unbind: vi.fn(() => { element = null }),
  } satisfies sFocus

  const factory = vi.fn(() => focus)

  return {
    focus,
    factory: factory as tFocusFactory,
    factoryMock: factory,
  }
}

function mountFocus(
  layers: tFocusLayer[],
  factory: tFocusFactory,
) {
  return mount(defineComponent({
    setup() {
      useFocus({ layers }, factory)
      return () => h('div')
    },
  }))
}

describe('useFocus', () => {
  it('initializes only the top modal of the highest focus layer', () => {
    const { focus, factory, factoryMock } = createFocusHarness()
    const lower = new ModalController(100)
    const higher = new ModalController(200)
    const lowerModal = lower.open(ComponentStub)
    const higherModal = higher.open(ComponentStub)
    const lowerElement = document.createElement('div')
    const higherElement = document.createElement('div')

    attachModalElement(lowerModal, lowerElement)
    attachModalElement(higherModal, higherElement)

    const wrapper = mountFocus([
      { manager: lower, trapFocus: true },
      { manager: higher, trapFocus: true },
    ], factory)

    expect(factoryMock).toHaveBeenCalledTimes(1)
    expect(focus.bind).toHaveBeenCalledTimes(1)
    expect(focus.bind).toHaveBeenCalledWith(higherElement)
    expect(focus.bind).not.toHaveBeenCalledWith(lowerElement)
    wrapper.unmount()
  })

  it('keeps the higher focus layer active until it becomes empty', () => {
    const { focus, factory } = createFocusHarness()
    const lower = new ModalController(100)
    const higher = new ModalController(200)
    const wrapper = mountFocus([
      { manager: lower, trapFocus: true },
      { manager: higher, trapFocus: true },
    ], factory)

    const firstLower = lower.open(ComponentStub)
    const firstLowerElement = document.createElement('div')
    attachModalElement(firstLower, firstLowerElement)

    const higherModal = higher.open(ComponentStub)
    const higherElement = document.createElement('div')
    attachModalElement(higherModal, higherElement)

    const secondLower = lower.open(ComponentStub)
    const secondLowerElement = document.createElement('div')
    attachModalElement(secondLower, secondLowerElement)

    expect(focus.bind).toHaveBeenCalledTimes(2)
    expect(focus.element).toBe(higherElement)

    higherModal.close()

    expect(focus.bind).toHaveBeenCalledTimes(3)
    expect(focus.bind).toHaveBeenLastCalledWith(secondLowerElement)
    expect(focus.element).toBe(secondLowerElement)
    wrapper.unmount()
  })

  it('pauses when the active modal has no element and resumes on attach', () => {
    const { focus, factory } = createFocusHarness()
    const controller = new ModalController(100)
    const wrapper = mountFocus([
      { manager: controller, trapFocus: true },
    ], factory)
    const modal = controller.open(ComponentStub)
    const firstElement = document.createElement('div')

    expect(focus.pause).toHaveBeenCalledTimes(1)

    attachModalElement(modal, firstElement)
    expect(focus.bind).toHaveBeenCalledWith(firstElement)

    detachModalElement(modal)
    expect(focus.pause).toHaveBeenCalledTimes(2)

    const secondElement = document.createElement('div')
    attachModalElement(modal, secondElement)
    expect(focus.bind).toHaveBeenLastCalledWith(secondElement)
    wrapper.unmount()
  })

  it('stops controller and modal subscriptions on cleanup', () => {
    const { focus, factory } = createFocusHarness()
    const controller = new ModalController(100)
    const wrapper = mountFocus([
      { manager: controller, trapFocus: true },
    ], factory)
    const modal = controller.open(ComponentStub)
    const element = document.createElement('div')

    attachModalElement(modal, element)
    expect(focus.bind).toHaveBeenCalledTimes(1)

    wrapper.unmount()

    attachModalElement(modal, document.createElement('div'))
    controller.open(ComponentStub)
    expect(focus.bind).toHaveBeenCalledTimes(1)
  })
})
