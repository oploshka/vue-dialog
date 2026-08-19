import { defineComponent, type Component, type PropType } from 'vue'
import type { tProps } from '@/Type/Type'
import { bridgeProps as bridgeMixinProps } from '@/Mixin/BridgeMixin'

export const presenterProps = {
  ...bridgeMixinProps,
  overlayComp: {
    type: [Object, Function] as PropType<Component>,
    required: true,
  },
  overlayProps: {
    type: Object as PropType<tProps>,
    default: () => ({}),
  },
  wrapComp: {
    type: [Object, Function] as PropType<Component>,
    required: true,
  },
  wrapProps: {
    type: Object as PropType<tProps>,
    default: () => ({}),
  },
  bridgeComp: {
    type: [Object, Function] as PropType<Component>,
    required: true,
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

  methods: {
    handleBackdrop(): void {
      if (this.closeOnBackdrop) {
        this.close()
      }
    },
  },
})
