<template>
  <div class="sidebar-right-position">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarRightPosition',
})
</script>

<style scoped lang="scss">
.sidebar-right-position {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(90vw, 380px);
}
</style>
