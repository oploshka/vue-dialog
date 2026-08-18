import type { Component, PropType } from 'vue'
import type { tProps } from '../Type/Type'

export type tClose = () => void
export type tBindComponentRef = (componentRef: unknown) => void

export const modalBridgeProps = {
  component: {
    type: [Object, Function] as PropType<Component>,
    required: true,
  },
  componentProps: {
    type: Object as PropType<tProps>,
    default: () => ({}),
  },
  close: {
    type: Function as PropType<tClose>,
    required: true,
  },
  bindComponentRef: {
    type: Function as PropType<tBindComponentRef>,
    required: true,
  },
}

export const modalPresenterProps = {
  ...modalBridgeProps,
  wrapComp: {
    type: [Object, Function] as PropType<Component>,
    default: undefined,
  },
  wrapProps: {
    type: Object as PropType<tProps>,
    default: () => ({}),
  },
  bridgeComp: {
    type: [Object, Function] as PropType<Component>,
    default: undefined,
  },
  bridgeProps: {
    type: Object as PropType<tProps>,
    default: () => ({}),
  },
  settings: {
    type: Object as PropType<tProps>,
    default: () => ({}),
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
}
