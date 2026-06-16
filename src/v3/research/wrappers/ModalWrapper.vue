<template>
  <Teleport to="body">
    <FocusTrap :active="true">
      <div class="content" :class="`modal--${descriptor.variant ?? 'medium'}`" role="dialog" aria-modal="true">
        <component
            :is="descriptor.component"
            v-bind="descriptor.props"
            @close="$emit('close')"
        />
      </div>
    </FocusTrap>
  </Teleport>
</template>

<script setup lang="ts">
import { FocusTrap } from 'focus-trap-vue'

defineProps<{ descriptor: any }>()
defineEmits<{ close: [] }>()
</script>

<style scoped>
.content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 640px) {
  .content {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }
}

@media (max-height: 500px) {
  .content {
    max-height: 80vh;
    top: 10%;
    transform: translate(-50%, 0);
  }
}
</style>