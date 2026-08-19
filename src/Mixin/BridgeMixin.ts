import { defineComponent, type Component, type PropType } from 'vue'
import type { tProps } from 'vue-dlg/Type/Type'

export type tBridgeClose = () => void
export type tBindComponentRef = (componentRef: unknown) => void

export const bridgeProps = {
  component: {
    type: [Object, Function] as PropType<Component>,
    required: true,
  },
  componentProps: {
    type: Object as PropType<tProps>,
    default: () => ({}),
  },
  close: {
    type: Function as PropType<tBridgeClose>,
    required: true,
  },
  bindComponentRef: {
    type: Function as PropType<tBindComponentRef>,
    required: true,
  },
}

export default defineComponent({
  name: 'BridgeMixin',
  props: bridgeProps,
})
