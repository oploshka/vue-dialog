<template>
  <div class="fullscreen-wrapper">
    <button
      class="fullscreen-wrapper__close"
      type="button"
      aria-label="Close fullscreen"
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

export default defineComponent({
  name: 'FullscreenWrapper',
  mixins: [WrapperMixin],

  props: {
    close: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
})
</script>

<style scoped>
.fullscreen-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 32px;
  background: #ffffff;
  transition: opacity 0.24s ease;
  will-change: opacity;
}

.fullscreen-wrapper__close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #50596c;
  cursor: pointer;
  font: inherit;
  font-size: 28px;
  line-height: 1;
}

.fullscreen-wrapper__close:hover {
  background: #f3f4f6;
}

:global(.modal-stack-enter-from) .fullscreen-wrapper,
:global(.modal-stack-leave-to) .fullscreen-wrapper {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .fullscreen-wrapper {
    transition: none;
  }
}
</style>
