<!-- Layer/Modal/ModalLayer.vue -->
<template>
  <div class="manager-group" :style="{ zIndex: manager.zIndex }">
    <TransitionGroup name="modal-stack">
      <div
          v-for="item in manager.items"
          :key="item.id"
          class="wrap-by-type"
          :style="{ zIndex: item.zIndex }"
      >
        <div
            v-if="getWrapper(item.type)?.hasOverlay"
            class="overlay"
            @click="getWrapper(item.type)?.overlayClickToClose ? manager.close(item.id) : null"
        />
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
import type { ModalController } from './ModalController'

defineProps<{ manager: ModalController }>()
</script>