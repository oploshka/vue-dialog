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

<script lang="ts">
import { defineComponent, type Component, type PropType } from 'vue'
import type { sLayerController } from './Type/Type'
import { lockBodyScroll, unlockBodyScroll } from './Utils/BodyScroll'

type tLayerEntry = {
  manager: sLayerController
  template: Component
}

export default defineComponent({
  name: 'LayerHost',

  props: {
    layers: {
      type: Array as PropType<tLayerEntry[]>,
      required: true,
    },
  },

  computed: {
    sortedLayers(): tLayerEntry[] {
      return [...this.layers].sort((a, b) => a.manager.zIndex - b.manager.zIndex)
    },

    hasItems(): boolean {
      return this.layers.some(layer => layer.manager.items.length > 0)
    },
  },

  watch: {
    hasItems(value: boolean): void {
      if (value) {
        lockBodyScroll('modal')
      } else {
        unlockBodyScroll('modal')
      }
    },
  },

  methods: {
    handleEsc(): void {
      const reversed = [...this.sortedLayers].reverse()
      for (const entry of reversed) {
        if (entry.manager.handleEsc?.()) return
      }
    },
  },
})
</script>
