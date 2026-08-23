import { createFocusTrap } from 'focus-trap'

export interface sFocusTrapAdapter {
  readonly active: boolean
  readonly paused: boolean
  activate(): void
  deactivate(options?: { returnFocus?: boolean }): void
}

export type tFocusTrapFactory = (element: HTMLElement) => sFocusTrapAdapter

export interface sFocus {
  readonly element: HTMLElement | null
  bind(element: HTMLElement): void
  unbind(): void
  activate(): void
  deactivate(returnFocus?: boolean): void
}

function createDefaultFocusTrap(element: HTMLElement): sFocusTrapAdapter {
  return createFocusTrap(element, {
    escapeDeactivates: false,
    clickOutsideDeactivates: false,
    fallbackFocus: element,
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

    this.unbind()
    this._element = element
    this.trap = this.createTrap(element)
  }

  unbind(): void {
    this.deactivate(false)
    this.trap = null
    this._element = null
  }

  activate(): void {
    if (!this.trap?.active) this.trap?.activate()
  }

  deactivate(returnFocus?: boolean): void {
    if (!this.trap?.active) return
    this.trap.deactivate({
      returnFocus: returnFocus ?? !this.trap.paused,
    })
  }
}
