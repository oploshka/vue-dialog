<template>
  <div class="sidebar-left-position">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarLeftPosition',
})
</script>

<style scoped lang="scss">
.sidebar-left-position {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 80vw;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

:global(.modal-stack-enter-from) .sidebar-left-position,
:global(.modal-stack-leave-to) .sidebar-left-position {
  transform: translate3d(-110%, 0, 0);
}

@media (min-width: 768px) {
  .sidebar-left-position {
    width: 240px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar-left-position {
    transition: none;
  }
}
</style>
