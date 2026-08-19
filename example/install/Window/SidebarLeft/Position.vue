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
}

@media (min-width: 768px) {
  .sidebar-left-position {
    width: 240px;
  }
}
</style>
