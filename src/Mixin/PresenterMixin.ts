import { defineComponent, type Component, type PropType } from 'vue'
import type { tProps } from '../Type/Type'
import { bridgeProps as bridgeMixinProps } from './BridgeMixin'

export const presenterProps = {
  ...bridgeMixinProps,
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

export default defineComponent({
  name: 'PresenterMixin',
  props: presenterProps,
})
