<template>
  <div class="modal-position">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalPosition',
})
</script>

<style scoped>
.modal-position {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 90vw;
  max-height: 90vh;
  transform: translate(-50%, -50%);
}
</style>
