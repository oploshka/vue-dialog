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
import { computed } from 'vue'
import type { Component } from 'vue'
import type { LayerManager } from './types'

const props = defineProps<{
  layers: Array<{
    manager: LayerManager
    template: Component
  }>
}>()

const sortedLayers = computed(() =>
    [...props.layers].sort((a, b) => a.manager.zIndex - b.manager.zIndex)
)

function handleEsc() {
  const reversed = [...sortedLayers.value].reverse()
  for (const entry of reversed) {
    if (entry.manager.handleEsc?.()) return
  }
}
</script>