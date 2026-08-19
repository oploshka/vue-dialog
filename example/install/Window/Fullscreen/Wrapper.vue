<template>
  <div class="fullscreen-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WrapperMixin } from 'vue-dlg'

export default defineComponent({
  name: 'FullscreenWrapper',
  mixins: [WrapperMixin],
})
</script>

<style scoped>
.fullscreen-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
