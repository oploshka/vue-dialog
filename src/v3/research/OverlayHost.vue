<!-- OverlayHost.vue -->
<template>
  <div @keydown.esc="handleEsc">
    <component
        v-for="entry in sortedLayers"
        :key="entry.manager.id"
        :is="entry.template"
        :manager="entry.manager"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { Component } from 'vue'
import type { sLayerController } from './Type/Type'
import { lockBodyScroll, unlockBodyScroll } from './Utils/BodyScroll'

const props = defineProps<{
  layers: Array<{
    manager: sLayerController
    template: Component
  }>
}>()

const sortedLayers = computed(() =>
    [...props.layers].sort((a, b) => a.manager.zIndex - b.manager.zIndex)
)

watch(
    () => props.layers.some(l => l.manager.items.length > 0),
    (hasItems) => {
      if (hasItems) {
        lockBodyScroll('modal')
      } else {
        unlockBodyScroll('modal')
      }
    }
)

function handleEsc() {
  const reversed = [...sortedLayers.value].reverse()
  for (const entry of reversed) {
    if (entry.manager.handleEsc?.()) return
  }
}
</script>