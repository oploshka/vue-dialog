<template>
  <Teleport to="body">
    <div @keydown.esc="handleEsc">
      <component
        v-for="entry in sortedLayers"
        :key="entry.manager.id"
        :is="entry.template"
        :manager="entry.manager"
      />
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useBodyScroll } from '@/Plugin/useBodyScroll'
import { useFocus } from '@/Module/Focus/useFocus'
import type { sLayerEntry } from '@/Type/Type'

type tBodyScrollCallback = () => void

export default defineComponent({
  name: 'LayerHost',

  props: {
    layers: {
      type: Array as PropType<readonly sLayerEntry[]>,
      required: true,
    },
    onLockBodyScroll: {
      type: Function as PropType<tBodyScrollCallback>,
      default: undefined,
    },
    onUnlockBodyScroll: {
      type: Function as PropType<tBodyScrollCallback>,
      default: undefined,
    },
  },

  setup(props) {
    useFocus(props)
    useBodyScroll(props)
  },

  computed: {
    sortedLayers(): sLayerEntry[] {
      return [...this.layers].sort((a, b) => a.manager.zIndex - b.manager.zIndex)
    },
  },

  methods: {
    handleEsc(): void {
      const reversed = [...this.sortedLayers].reverse()
      for (const entry of reversed) {
        const blocksLowerEsc = entry.blockLowerEsc === true && entry.manager.items.length > 0
        if (entry.manager.handleEsc?.()) return
        if (blocksLowerEsc) return
      }
    },
  },
})
</script>
