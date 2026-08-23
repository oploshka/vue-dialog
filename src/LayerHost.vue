<template>
  <Teleport to="body">
    <div @keydown.esc="handleEsc">
      <component
        v-for="entry in sortedLayers"
        :key="entry.manager.id"
        :is="entry.template"
        v-bind="getLayerProps(entry)"
      />
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, type Component, type PropType } from 'vue'
import { useBodyScroll } from '@/Plugin/useBodyScroll'
import { useFocus } from '@/Plugin/useFocus'
import type { sLayerController } from '@/Type/Type'

type tLayerEntry = {
  manager: sLayerController
  template: Component
  lockBodyScroll?: boolean
  trapFocus?: boolean
}

type tBodyScrollCallback = () => void

export default defineComponent({
  name: 'LayerHost',

  props: {
    layers: {
      type: Array as PropType<tLayerEntry[]>,
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
    const focus = useFocus(props)
    useBodyScroll(props)
    return { focus }
  },

  computed: {
    sortedLayers(): tLayerEntry[] {
      return [...this.layers].sort((a, b) => a.manager.zIndex - b.manager.zIndex)
    },
  },

  methods: {
    getLayerProps(entry: tLayerEntry): Record<string, unknown> {
      const props: Record<string, unknown> = {
        manager: entry.manager,
      }

      if (entry.trapFocus === true) {
        props.focus = this.focus
      }

      return props
    },

    handleEsc(): void {
      const reversed = [...this.sortedLayers].reverse()
      for (const entry of reversed) {
        if (entry.manager.handleEsc?.()) return
      }
    },
  },
})
</script>
