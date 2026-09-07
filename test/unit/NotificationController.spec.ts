import type { Component } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { NotificationController, type Notification } from '@/Layer/Notification/NotificationController'

const ComponentStub = {} as Component

afterEach(() => {
  vi.useRealTimers()
})

describe('NotificationController', () => {
  it('creates unique controller ids', () => {
    expect(new NotificationController().id).not.toBe(new NotificationController().id)
  })

  it('shows notifications up to maxVisible and promotes the queue in FIFO order', () => {
    const controller = new NotificationController({ maxVisible: 2, duration: 0 })
    const first = controller.show(ComponentStub)
    const second = controller.show(ComponentStub)
    const third = controller.show(ComponentStub)

    expect(controller.items).toEqual([first, second])

    first.close()
    expect(controller.items).toEqual([second, third])
  })

  it('promotes the queue before running onClose', () => {
    const controller = new NotificationController({ maxVisible: 1, duration: 0 })
    let replacement: Notification | undefined

    const first = controller.show(ComponentStub, {}, {
      onClose: () => {
        replacement = controller.show(ComponentStub)
      },
    })
    const queued = controller.show(ComponentStub)

    first.close()
    expect(controller.items).toEqual([queued])

    queued.close()
    expect(controller.items).toEqual([replacement])
  })

  it('keeps queue state consistent when onClose throws', () => {
    const controller = new NotificationController({ maxVisible: 1, duration: 0 })
    const error = new Error('close failed')
    const first = controller.show(ComponentStub, {}, {
      onClose: () => { throw error },
    })
    const queued = controller.show(ComponentStub)

    expect(() => first.close()).toThrow(error)
    expect(controller.items).toEqual([queued])
  })

  it('normalizes maxVisible to a positive integer', () => {
    const controller = new NotificationController({ maxVisible: 1.9, duration: 0 })
    const first = controller.show(ComponentStub)
    const second = controller.show(ComponentStub)

    expect(controller.items).toEqual([first])

    first.close()
    expect(controller.items).toEqual([second])
  })

  it('allows a queued notification to be closed before it becomes visible', () => {
    const controller = new NotificationController({ maxVisible: 1, duration: 0 })
    const first = controller.show(ComponentStub)
    const onClose = vi.fn()
    const queued = controller.show(ComponentStub, {}, { onClose })

    queued.close()
    expect(onClose).toHaveBeenCalledTimes(1)

    queued.close()
    expect(onClose).toHaveBeenCalledTimes(1)

    first.close()
    expect(controller.items).toHaveLength(0)
  })

  it('uses the controller duration and auto-closes a visible notification', () => {
    vi.useFakeTimers()

    const controller = new NotificationController({ duration: 1000 })
    const onClose = vi.fn()
    const notification = controller.show(ComponentStub, {}, { onClose })

    vi.advanceTimersByTime(999)
    expect(controller.items).toContain(notification)

    vi.advanceTimersByTime(1)
    expect(controller.items).not.toContain(notification)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('supports a per-notification duration override', () => {
    vi.useFakeTimers()

    const controller = new NotificationController({ duration: 1000 })
    const notification = controller.show(ComponentStub, {}, { duration: 250 })

    vi.advanceTimersByTime(249)
    expect(controller.items).toContain(notification)

    vi.advanceTimersByTime(1)
    expect(controller.items).not.toContain(notification)
  })

  it('normalizes negative durations to zero', () => {
    vi.useFakeTimers()

    const controller = new NotificationController({ duration: -100 })
    const notification = controller.show(ComponentStub, {}, { duration: -1 })

    expect(notification.duration).toBe(0)

    vi.advanceTimersByTime(60_000)
    expect(controller.items).toContain(notification)
  })

  it('does not start an automatic timer when duration is zero', () => {
    vi.useFakeTimers()

    const controller = new NotificationController({ duration: 0 })
    const notification = controller.show(ComponentStub)

    vi.advanceTimersByTime(60_000)
    expect(controller.items).toContain(notification)
  })

  it('pause and resume preserve the remaining duration', () => {
    vi.useFakeTimers()

    const controller = new NotificationController({ duration: 1000 })
    const notification = controller.show(ComponentStub)

    vi.advanceTimersByTime(400)
    expect(notification.pause()).toBe(notification)

    vi.advanceTimersByTime(5000)
    expect(controller.items).toContain(notification)

    expect(notification.resume()).toBe(notification)
    vi.advanceTimersByTime(599)
    expect(controller.items).toContain(notification)

    vi.advanceTimersByTime(1)
    expect(controller.items).not.toContain(notification)
  })

  it('closeAll closes visible and queued notifications and clears timers', () => {
    vi.useFakeTimers()

    const controller = new NotificationController({ maxVisible: 1, duration: 1000 })
    const firstOnClose = vi.fn()
    const secondOnClose = vi.fn()

    controller.show(ComponentStub, {}, { onClose: firstOnClose })
    controller.show(ComponentStub, {}, { onClose: secondOnClose })

    controller.closeAll()
    controller.closeAll()

    expect(controller.items).toHaveLength(0)
    expect(firstOnClose).toHaveBeenCalledTimes(1)
    expect(secondOnClose).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(5000)
    expect(firstOnClose).toHaveBeenCalledTimes(1)
    expect(secondOnClose).toHaveBeenCalledTimes(1)
  })

  it('closeAll finishes callbacks and keeps callback-created notifications', () => {
    const controller = new NotificationController({ maxVisible: 1, duration: 0 })
    const error = new Error('close failed')
    const laterOnClose = vi.fn()
    let replacement: Notification | undefined

    controller.show(ComponentStub, {}, { onClose: () => { throw error } })
    controller.show(ComponentStub, {}, {
      onClose: () => {
        laterOnClose()
        replacement = controller.show(ComponentStub)
      },
    })

    expect(() => controller.closeAll()).toThrow(error)
    expect(laterOnClose).toHaveBeenCalledTimes(1)
    expect(controller.items).toEqual([replacement])
  })

  it('does not consume ESC', () => {
    const controller = new NotificationController({ duration: 0 })
    controller.show(ComponentStub)

    expect(controller.handleEsc()).toBe(false)
    expect(controller.items).toHaveLength(1)
  })
})
