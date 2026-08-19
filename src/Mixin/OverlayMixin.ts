import { defineComponent, type PropType } from 'vue'

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
