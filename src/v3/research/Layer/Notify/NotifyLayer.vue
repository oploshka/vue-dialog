<!-- Layer/Notify/NotifyLayer.vue -->
<template>
  <div class="manager-group notification-layer" :style="{ zIndex: manager.zIndex }">
    <TransitionGroup name="notification">
      <div
          v-for="item in manager.items"
          :key="item.id"
          class="wrap-by-type"
      >
        <div class="content">
          <component
              :is="getWrapper(item.type)?.component"
              :descriptor="item"
              @close="manager.close(item.id)"
          />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { getWrapper } from '../../Overlays'
import type { NotifyController } from './NotifyController'

defineProps<{ manager: NotifyController }>()
</script>

<style scoped>
.notification-layer {
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.notification-layer > * {
  pointer-events: auto;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>