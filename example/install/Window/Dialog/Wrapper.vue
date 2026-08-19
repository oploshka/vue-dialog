<template>
  <div class="dialog-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { WrapperMixin } from 'vue-dlg'

export default defineComponent({
  name: 'DialogWrapper',
  mixins: [WrapperMixin],

  props: {
    close: {
      type: Function as PropType<() => void>,
      default: null,
    },
  },
})
</script>

<style scoped>
.dialog-wrapper {
  position: relative;
  width: min(520px, 90vw);
  max-height: 75vh;
  overflow: hidden;
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  box-shadow: 0 16px 40px rgba(28, 41, 61, 0.16);
  transform-origin: center;
  transition:
    opacity 0.18s ease,
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

:global(.modal-stack-enter-from) .dialog-wrapper {
  opacity: 0;
  transform: translateY(14px) scale(0.96);
}

:global(.modal-stack-leave-to) .dialog-wrapper {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .dialog-wrapper {
    transition: none;
  }
}
</style>
