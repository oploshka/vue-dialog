/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it, vi } from 'vitest'
import {
  Focus,
  type sFocusTrapAdapter,
  type tFocusTrapFactory,
} from '@/Plugin/Focus'

function createTrapHarness() {
  let active = false
  let paused = false

  const trap = {
    get active() { return active },
    get paused() { return paused },
    activate: vi.fn(() => { active = true }),
    deactivate: vi.fn(() => { active = false; paused = false }),
  } satisfies sFocusTrapAdapter

  const factory: tFocusTrapFactory = vi.fn(() => trap)
  return {
    trap,
    factory,
    setPaused: (value: boolean) => { paused = value },
  }
}

describe('Focus', () => {
  it('creates and activates a trap on bind', () => {
    const { trap, factory } = createTrapHarness()
    const element = document.createElement('div')
    const focus = new Focus(factory)

    focus.bind(element)
    focus.activate()
    focus.activate()

    expect(factory).toHaveBeenCalledWith(element)
    expect(trap.activate).toHaveBeenCalledTimes(1)
  })

  it('does not return focus when an auto-paused trap is deactivated', () => {
    const { trap, factory, setPaused } = createTrapHarness()
    const focus = new Focus(factory)

    focus.bind(document.createElement('div'))
    focus.activate()
    setPaused(true)
    focus.deactivate()

    expect(trap.deactivate).toHaveBeenCalledWith({ returnFocus: false })
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
