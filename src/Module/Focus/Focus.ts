import { createFocusTrap } from 'focus-trap'

export interface sFocusTrapAdapter {
  readonly active: boolean
  readonly paused: boolean
  activate(): void
  deactivate(options?: { returnFocus?: boolean }): void
  pause(): void
  unpause(): void
  updateContainerElements(element: HTMLElement): void
}

export type tFocusTrapFactory = (
  element: HTMLElement,
  getFallbackFocus: () => HTMLElement,
) => sFocusTrapAdapter

export interface sFocus {
  readonly element: HTMLElement | null
  bind(element: HTMLElement): void
  pause(): void
  activate(): void
  deactivate(returnFocus?: boolean): void
  unbind(): void
}

function createDefaultFocusTrap(
  element: HTMLElement,
  getFallbackFocus: () => HTMLElement,
): sFocusTrapAdapter {
  return createFocusTrap(element, {
    escapeDeactivates: false,
    clickOutsideDeactivates: false,
    fallbackFocus: getFallbackFocus,
    preventScroll: true,
  })
}

export class Focus implements sFocus {
  private _element: HTMLElement | null = null
  private trap: sFocusTrapAdapter | null = null
  private readonly createTrap: tFocusTrapFactory

  constructor(createTrap: tFocusTrapFactory = createDefaultFocusTrap) {
    this.createTrap = createTrap
  }

  get element(): HTMLElement | null {
    return this._element
  }

  bind(element: HTMLElement): void {
    if (this._element === element) return

    this._element = element

    if (!this.trap) {
      this.trap = this.createTrap(element, () => this._element ?? element)
      return
    }

    const active = this.trap.active
    if (active && !this.trap.paused) this.trap.pause()

    this.trap.updateContainerElements(element)

    if (active) this.trap.unpause()
  }

  pause(): void {
    if (this.trap?.active && !this.trap.paused) this.trap.pause()
  }

  activate(): void {
    if (!this.trap) return
    if (!this.trap.active) this.trap.activate()
    else if (this.trap.paused) this.trap.unpause()
  }

  deactivate(returnFocus: boolean = true): void {
    if (!this.trap?.active) return
    this.trap.deactivate({ returnFocus })
  }

  unbind(): void {
    this.deactivate(false)
    this.trap = null
    this._element = null
  }
}
