import type { Component } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { ModalController } from '@/Layer/Modal/ModalController'
import type { Modal } from '@/Layer/Modal/Modal'

const ComponentStub = {} as Component

describe('ModalController', () => {
  it('creates unique controller ids', () => {
    expect(new ModalController().id).not.toBe(new ModalController().id)
  })

  it('opens a modal and exposes it through items and top', () => {
    const controller = new ModalController(3200)
    const props = { title: 'Example' }

    const modal = controller.open(ComponentStub, props)

    expect(controller.zIndex).toBe(3200)
    expect(controller.items).toEqual([modal])
    expect(controller.top).toBe(modal)
    expect(modal.component).toBe(ComponentStub)
    expect(modal.props).toBe(props)
    expect(modal.zIndex).toBe(1)
    expect(modal.settings.closeOnEsc).toBe(true)
    expect(modal.settings.closeOnBackdrop).toBe(true)
  })

  it('resolves custom modal settings while keeping caller props by identity', () => {
    const controller = new ModalController()
    const props = { value: 42 }
    const presenterProps = { role: 'dialog' }

    const modal = controller.open(ComponentStub, props, {
      closeOnEsc: false,
      closeOnBackdrop: false,
      presenterProps,
    })

    expect(modal.props).toBe(props)
    expect(modal.settings.presenterProps).toBe(presenterProps)
    expect(modal.settings.closeOnEsc).toBe(false)
    expect(modal.settings.closeOnBackdrop).toBe(false)
  })

  it('emits add and remove events from the modal collection', () => {
    const controller = new ModalController()
    const onAdd = vi.fn()
    const onRemove = vi.fn()
    const stopAdd = controller.on('add', onAdd)
    const stopRemove = controller.on('remove', onRemove)

    const first = controller.open(ComponentStub)
    const second = controller.open(ComponentStub)
    second.close()

    expect(onAdd).toHaveBeenNthCalledWith(1, first)
    expect(onAdd).toHaveBeenNthCalledWith(2, second)
    expect(onRemove).toHaveBeenCalledWith(second)

    stopAdd()
    stopRemove()
    first.close()

    expect(onAdd).toHaveBeenCalledTimes(2)
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('removes only the closed modal and calls onClose once', () => {
    const controller = new ModalController()
    const onClose = vi.fn()
    const first = controller.open(ComponentStub)
    const second = controller.open(ComponentStub, {}, { onClose })

    expect(second.close()).toBe(second)
    expect(controller.items).toEqual([first])
    expect(controller.top).toBe(first)
    expect(onClose).toHaveBeenCalledTimes(1)

    second.close()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('keeps z-index monotonic while the stack is not empty and resets after it becomes empty', () => {
    const controller = new ModalController()
    const first = controller.open(ComponentStub)
    const second = controller.open(ComponentStub)
    const third = controller.open(ComponentStub)

    expect([first.zIndex, second.zIndex, third.zIndex]).toEqual([1, 2, 3])

    second.close()
    const fourth = controller.open(ComponentStub)
    expect(fourth.zIndex).toBe(4)

    controller.closeAll()
    const next = controller.open(ComponentStub)
    expect(next.zIndex).toBe(1)
  })

  it('closeAll closes every modal and calls each onClose once', () => {
    const controller = new ModalController()
    const firstOnClose = vi.fn()
    const secondOnClose = vi.fn()

    controller.open(ComponentStub, {}, { onClose: firstOnClose })
    controller.open(ComponentStub, {}, { onClose: secondOnClose })

    controller.closeAll()
    controller.closeAll()

    expect(controller.items).toHaveLength(0)
    expect(controller.top).toBeUndefined()
    expect(firstOnClose).toHaveBeenCalledTimes(1)
    expect(secondOnClose).toHaveBeenCalledTimes(1)
  })

  it('closeAll only closes the stack snapshot', () => {
    const controller = new ModalController()
    let replacement: Modal | undefined

    controller.open(ComponentStub)
    controller.open(ComponentStub, {}, {
      onClose: () => {
        replacement = controller.open(ComponentStub)
      },
    })

    controller.closeAll()

    expect(controller.items).toEqual([replacement])
  })

  it('closeAll finishes the snapshot when an onClose callback throws', () => {
    const controller = new ModalController()
    const firstOnClose = vi.fn()
    const error = new Error('close failed')

    controller.open(ComponentStub, {}, { onClose: firstOnClose })
    controller.open(ComponentStub, {}, { onClose: () => { throw error } })

    expect(() => controller.closeAll()).toThrow(error)
    expect(controller.items).toHaveLength(0)
    expect(firstOnClose).toHaveBeenCalledTimes(1)

    const next = controller.open(ComponentStub)
    expect(next.zIndex).toBe(1)
  })

  it('closes only the top modal when ESC is allowed', () => {
    const controller = new ModalController()
    const first = controller.open(ComponentStub)
    const second = controller.open(ComponentStub)

    expect(controller.handleEsc()).toBe(true)
    expect(controller.items).toEqual([first])
    expect(controller.items).not.toContain(second)
  })

  it('consumes ESC without closing when the top modal disables ESC closing', () => {
    const controller = new ModalController()
    const first = controller.open(ComponentStub)
    const second = controller.open(ComponentStub, {}, { closeOnEsc: false })

    expect(controller.handleEsc()).toBe(true)
    expect(controller.items).toEqual([first, second])
    expect(controller.top).toBe(second)
  })

  it('does not consume ESC when the stack is empty', () => {
    expect(new ModalController().handleEsc()).toBe(false)
  })
})
