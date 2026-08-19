<template>
  <div class="default-overlay" @click="handleClick" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OverlayMixin from '../Mixin/Overlay'

export default defineComponent({
  name: 'DefaultOverlay',

  mixins: [OverlayMixin],
})
</script>

<style scoped>
.default-overlay {
  position: absolute;
  inset: 0;
}
</style>
