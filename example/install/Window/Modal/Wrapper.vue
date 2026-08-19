<template>
  <div
    class="modal-wrapper"
    :class="`modal-wrapper--${size}`"
  >
    <button
      class="modal-wrapper__close"
      type="button"
      aria-label="Close modal"
      @click="close()"
    >
      ×
    </button>

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
    close: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
})
</script>

<style scoped>
.modal-wrapper {
  position: relative;
  box-sizing: border-box;
  max-height: 90vh;
  overflow: auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 16px 40px rgba(28, 41, 61, 0.16);
  transform-origin: center;
  transition:
    opacity 0.2s ease,
    transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
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

.modal-wrapper__close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #6c757d;
  cursor: pointer;
  font: inherit;
  font-size: 24px;
  line-height: 1;
}

.modal-wrapper__close:hover {
  background: #f3f4f6;
}

:global(.modal-stack-enter-from) .modal-wrapper {
  opacity: 0;
  transform: translateY(24px) scale(0.9);
}

:global(.modal-stack-leave-to) .modal-wrapper {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .modal-wrapper {
    transition: none;
  }
}
</style>
