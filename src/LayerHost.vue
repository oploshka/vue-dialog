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
import { defineComponent, type Component, type PropType } from 'vue'
import type { sLayerController } from 'vue-dlg/Type/Type'

type tLayerEntry = {
  manager: sLayerController
  template: Component
  lockBodyScroll?: boolean
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

  data() {
    return {
      bodyScrollLocked: false,
    }
  },

  computed: {
    sortedLayers(): tLayerEntry[] {
      return [...this.layers].sort((a, b) => a.manager.zIndex - b.manager.zIndex)
    },

    hasScrollLockItems(): boolean {
      return this.layers.some(
        layer => layer.lockBodyScroll === true && layer.manager.items.length > 0,
      )
    },
  },

  watch: {
    hasScrollLockItems: {
      handler(value: boolean): void {
        this.syncBodyScroll(value)
      },
      immediate: true,
    },
  },

  beforeUnmount() {
    if (!this.bodyScrollLocked) return

    this.onUnlockBodyScroll?.()
    this.bodyScrollLocked = false
  },

  methods: {
    syncBodyScroll(shouldLock: boolean): void {
      if (shouldLock === this.bodyScrollLocked) return

      if (shouldLock) {
        this.onLockBodyScroll?.()
      } else {
        this.onUnlockBodyScroll?.()
      }

      this.bodyScrollLocked = shouldLock
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
