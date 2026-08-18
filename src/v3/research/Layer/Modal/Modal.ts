import type { Component } from 'vue'
import type { sLayerDescriptor } from '../../Type/Type'

type tModalSettings = sLayerDescriptor['settings']
type tModalCallbacks = sLayerDescriptor['callbacks']

type tModalConfig = {
  id: string
  zIndex: number
  type: string
  variant?: string
  component: Component
  props: Record<string, any>
  settings: tModalSettings
  callbacks: tModalCallbacks
}

export class Modal implements sLayerDescriptor {
  readonly id: string
  readonly zIndex: number
  readonly type: string
  readonly variant?: string
  readonly component: Component
  readonly props: Record<string, any>
  readonly settings: tModalSettings
  readonly callbacks: tModalCallbacks

  private componentRef: unknown = null
  private readonly requestClose: (modal: Modal) => void

  constructor(config: tModalConfig, requestClose: (modal: Modal) => void) {
    this.id = config.id
    this.zIndex = config.zIndex
    this.type = config.type
    this.variant = config.variant
    this.component = config.component
    this.props = config.props
    this.settings = config.settings
    this.callbacks = config.callbacks
    this.requestClose = requestClose
  }

  close(): this {
    this.requestClose(this)
    return this
  }

  getComponentRef<T = unknown>(): T | null {
    return this.componentRef as T | null
  }

  setComponentRef(ref: unknown): void {
    this.componentRef = ref
  }
}
