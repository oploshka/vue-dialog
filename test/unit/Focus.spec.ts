/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it, vi } from 'vitest'
import {
  Focus,
  type sFocusTrapAdapter,
  type tFocusTrapFactory,
} from '@/Module/Focus/Focus'

function createTrapHarness() {
  let active = false
  let paused = false

  const trap = {
    get active() { return active },
    get paused() { return paused },
    activate: vi.fn(() => { active = true }),
    deactivate: vi.fn(() => { active = false; paused = false }),
    pause: vi.fn(() => { if (active) paused = true }),
    unpause: vi.fn(() => { if (active) paused = false }),
    updateContainerElements: vi.fn(),
  } satisfies sFocusTrapAdapter

  const factory: tFocusTrapFactory = vi.fn(() => trap)
  return { trap, factory }
}

describe('Focus', () => {
  it('creates and activates one trap', () => {
    const { trap, factory } = createTrapHarness()
    const element = document.createElement('div')
    const focus = new Focus(factory)

    focus.bind(element)
    focus.activate()
    focus.activate()

    expect(factory).toHaveBeenCalledTimes(1)
    expect(trap.activate).toHaveBeenCalledTimes(1)
  })

  it('moves an active trap to a new container without deactivating it', () => {
    const { trap, factory } = createTrapHarness()
    const first = document.createElement('div')
    const second = document.createElement('div')
    const focus = new Focus(factory)

    focus.bind(first)
    focus.activate()
    focus.bind(second)

    expect(factory).toHaveBeenCalledTimes(1)
    expect(trap.pause).toHaveBeenCalledTimes(1)
    expect(trap.updateContainerElements).toHaveBeenCalledWith(second)
    expect(trap.unpause).toHaveBeenCalledTimes(1)
    expect(trap.deactivate).not.toHaveBeenCalled()
    expect(focus.element).toBe(second)
  })

  it('resumes a paused trap on activate', () => {
    const { trap, factory } = createTrapHarness()
    const focus = new Focus(factory)

    focus.bind(document.createElement('div'))
    focus.activate()
    focus.pause()
    focus.activate()

    expect(trap.pause).toHaveBeenCalledTimes(1)
    expect(trap.unpause).toHaveBeenCalledTimes(1)
  })

  it('deactivates without return focus when unbound', () => {
    const { trap, factory } = createTrapHarness()
    const focus = new Focus(factory)

    focus.bind(document.createElement('div'))
    focus.activate()
    focus.unbind()

    expect(trap.deactivate).toHaveBeenCalledWith({ returnFocus: false })
    expect(focus.element).toBeNull()
  })
})
