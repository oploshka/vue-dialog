import { defineComponent, type PropType } from 'vue'
import type { tProps } from '../Type/Type'

type tClose = () => void

export const overlayProps = {
  close: {
    type: Function as PropType<tClose>,
    required: true,
  },
  closeOnClick: {
    type: Boolean,
    default: true,
  },
  settings: {
    type: Object as PropType<tProps>,
    default: () => ({}),
  },
}

export default defineComponent({
  name: 'OverlayMixin',

  props: overlayProps,

  methods: {
    handleClick(): void {
      if (this.closeOnClick) {
        this.close()
      }
    },
  },
})
