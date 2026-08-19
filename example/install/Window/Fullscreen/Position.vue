<template>
  <div class="fullscreen-position">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FullscreenPosition',
})
</script>

<style scoped>
.fullscreen-position {
  position: absolute;
  inset: 0;
}
</style>
