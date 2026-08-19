<template>
  <div class="modal-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WrapperMixin } from 'vue-dlg'

export default defineComponent({
  name: 'ModalWrapper',
  mixins: [WrapperMixin],
})
</script>

<style scoped>
.modal-wrapper {
  box-sizing: border-box;
  max-height: 90vh;
  overflow: auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 16px 40px rgba(28, 41, 61, 0.16);
}
</style>
