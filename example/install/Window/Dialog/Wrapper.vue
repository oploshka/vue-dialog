<template>
  <div class="dialog-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WrapperMixin } from 'vue-dlg'

export default defineComponent({
  name: 'DialogWrapper',
  mixins: [WrapperMixin],
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
}
</style>
