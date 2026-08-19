import type { Component } from 'vue'
import type { sLayerDescriptor, sResolvedModalSettings, tProps } from '../../Type/Type'
import { getModalComponentRef } from './ModalRuntime'

type tModalConfig = {
  id: string
  zIndex: number
  component: Component
  props: tProps
  settings: sResolvedModalSettings
}

export class Modal implements sLayerDescriptor {
  readonly id: string
  readonly zIndex: number
  readonly component: Component
  readonly props: tProps
  readonly settings: sResolvedModalSettings

  private readonly requestClose: (modal: Modal) => void

  constructor(config: tModalConfig, requestClose: (modal: Modal) => void) {
    this.id = config.id
    this.zIndex = config.zIndex
    this.component = config.component
    this.props = config.props
    this.settings = config.settings
    this.requestClose = requestClose
  }

  close(): this {
    this.requestClose(this)
    return this
  }

  getComponentRef<T = unknown>(): T | null {
    return getModalComponentRef<T>(this)
  }
}
