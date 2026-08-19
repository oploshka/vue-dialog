<template>
  <div
    class="modal-wrapper"
    :class="`modal-wrapper--${size}`"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { WrapperMixin } from 'vue-dlg'

type tModalSize = 'small' | 'medium' | 'large'

export default defineComponent({
  name: 'ModalWrapper',
  mixins: [WrapperMixin],

  props: {
    size: {
      type: String as PropType<tModalSize>,
      default: 'medium',
    },
  },
})
</script>

<style scoped>
.modal-wrapper {
  box-sizing: border-box;
  max-height: 90vh;
  overflow: auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 16px 40px rgba(28, 41, 61, 0.16);
  transform-origin: center;
  transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.modal-wrapper--small {
  width: min(90vw, 360px);
}

.modal-wrapper--medium {
  width: min(90vw, 560px);
}

.modal-wrapper--large {
  width: min(90vw, 800px);
}

:global(.modal-stack-enter-from) .modal-wrapper {
  transform: translateY(24px) scale(0.9);
}

:global(.modal-stack-leave-to) .modal-wrapper {
  transform: translateY(12px) scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .modal-wrapper {
    transition: none;
  }
}
</style>
