<template>
  <div
    class="sidebar-right-position"
    :class="`sidebar-right-position--${size}`"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

type tSidebarRightSize = 'small' | 'medium' | 'large'

export default defineComponent({
  name: 'SidebarRightPosition',

  props: {
    size: {
      type: String as PropType<tSidebarRightSize>,
      default: 'small',
    },
  },
})
</script>

<style scoped lang="scss">
.sidebar-right-position {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  max-width: 90vw;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.sidebar-right-position--small {
  width: 380px;
}

.sidebar-right-position--medium {
  width: 760px;
}

.sidebar-right-position--large {
  width: 1140px;
}

:global(.modal-stack-enter-from) .sidebar-right-position,
:global(.modal-stack-leave-to) .sidebar-right-position {
  transform: translate3d(110%, 0, 0);
}

@media (prefers-reduced-motion: reduce) {
  .sidebar-right-position {
    transition: none;
  }
}
</style>
