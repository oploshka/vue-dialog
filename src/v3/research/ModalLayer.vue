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
import { watch } from 'vue'
import { getWrapper } from './overlays'
import { lockBodyScroll, unlockBodyScroll } from './utils/bodyScroll'
import type { ModalStack } from './ModalStack'

const props = defineProps<{ manager: ModalStack }>()

watch(
    () => props.manager.items.length,
    (newLen, oldLen) => {
      if (oldLen === 0 && newLen > 0) {
        lockBodyScroll('modal')
      } else if (oldLen > 0 && newLen === 0) {
        unlockBodyScroll('modal')
      }
    }
)
</script>