/**
 * @vitest-environment happy-dom
 */

import { defineComponent, h, shallowReactive, nextTick, type Component, type PropType } from 'vue'
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
    props: {
      layers: { type: Array as PropType<tFocusLayer[]>, required: true },
    },
    setup(props) {
      useFocus(props, factory)
      return () => h('div')
    },
  }), { props: { layers } })
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
    expect(focus.bind.mock.calls[0]?.[0]).toBe(higherElement)
    wrapper.unmount()
  })

  it('updates focus on layer replacement and releases subscriptions when disabled or removed', async () => {
    const { focus, factory } = createFocusHarness()
    const first = new ModalController(100)
    const second = new ModalController(200)
    const firstModal = first.open(ComponentStub)
    const secondModal = second.open(ComponentStub)
    const firstElement = document.createElement('div')
    const secondElement = document.createElement('div')
    attachModalElement(firstModal, firstElement)
    attachModalElement(secondModal, secondElement)
    const wrapper = mountFocus([{ manager: first, trapFocus: true }], factory)
    expect(focus.element).toBe(firstElement)
    await wrapper.setProps({ layers: [{ manager: second, trapFocus: true }] })
    console.log('FOCUS PROPS', wrapper.props('layers')[0]?.manager === second, focus.bind.mock.calls.length)
    expect(focus.element).toBe(secondElement)
    focus.bind.mockClear()
    first.closeAll()
    attachModalElement(firstModal, document.createElement('div'))
    expect(focus.bind).not.toHaveBeenCalled()
    await wrapper.setProps({ layers: [{ manager: second, trapFocus: false }] })
    expect(focus.element).toBeNull()
    await wrapper.setProps({ layers: [{ manager: second, trapFocus: true }] })
    expect(focus.element).toBe(secondElement)
    await wrapper.setProps({ layers: [] })
    expect(focus.element).toBeNull()
    wrapper.unmount()
  })

  it('tracks reactive layer ordering without replacing the focus trap', async () => {
    const { focus, factory, factoryMock } = createFocusHarness()
    const first = shallowReactive(new ModalController(100))
    const second = new ModalController(200)
    const firstElement = document.createElement('div')
    const secondElement = document.createElement('div')
    attachModalElement(first.open(ComponentStub), firstElement)
    attachModalElement(second.open(ComponentStub), secondElement)
    const wrapper = mountFocus([
      { manager: first, trapFocus: true },
      { manager: second, trapFocus: true },
    ], factory)
    expect(focus.element).toBe(secondElement)
    first.zIndex = 300
    await nextTick()
    expect(focus.element).toBe(firstElement)
    expect(factoryMock).toHaveBeenCalledTimes(1)
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
